#![cfg(test)]
extern crate std;

use super::*;
use soroban_sdk::{
    testutils::{Address as _, Events as _},
    vec, Address, Env, Symbol, TryFromVal, TryIntoVal, Val, Vec,
};

fn setup_initialized_contract(env: &Env) -> (FaucetContractClient<'_>, Address) {
    let contract_id = env.register_contract(None, FaucetContract);
    let client = FaucetContractClient::new(env, &contract_id);
    let owner = Address::generate(env);
    client.initialize(&owner, &symbol_short!("HELLO"));
    (client, owner)
}

#[test]
fn get_message_before_initialization_returns_empty() {
    let env = Env::default();
    let contract_id = env.register_contract(None, FaucetContract);
    let client = FaucetContractClient::new(&env, &contract_id);

    assert_eq!(client.get_message(), symbol_short!("EMPTY"));
}

#[test]
fn initialize_sets_owner_message_and_counter() {
    let env = Env::default();
    let contract_id = env.register_contract(None, FaucetContract);
    let client = FaucetContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);

    client.initialize(&owner, &symbol_short!("HELLO"));

    assert_eq!(client.get_owner(), owner);
    assert_eq!(client.get_message(), symbol_short!("HELLO"));
    assert_eq!(client.get_counter(), 0);
}

#[test]
fn initialize_publishes_init_event() {
    let env = Env::default();
    let contract_id = env.register_contract(None, FaucetContract);
    let client = FaucetContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    let message = symbol_short!("HELLO");

    client.initialize(&owner, &message);

    let events = env.events().all();
    assert_eq!(events.len(), 1);

    let (emitter, topics, data) = events.get(0).unwrap();
    assert_eq!(emitter, contract_id);
    assert_eq!(topics.len(), 1);
    let topic = Symbol::try_from_val(&env, &topics.get(0).unwrap()).unwrap();
    assert_eq!(topic, symbol_short!("INIT"));

    let parts: Vec<Val> = data.try_into_val(&env).unwrap();
    assert_eq!(parts.len(), 2);
    let emitted_owner = Address::try_from_val(&env, &parts.get(0).unwrap()).unwrap();
    let emitted_message = Symbol::try_from_val(&env, &parts.get(1).unwrap()).unwrap();
    assert_eq!(emitted_owner, owner);
    assert_eq!(emitted_message, message);
}

#[test]
#[should_panic(expected = "Contract already initialized")]
fn cannot_initialize_twice() {
    let env = Env::default();
    let contract_id = env.register_contract(None, FaucetContract);
    let client = FaucetContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.initialize(&owner, &symbol_short!("HELLO"));
    client.initialize(&owner, &symbol_short!("AGAIN"));
}

#[test]
fn set_message_updates_state_and_increments_counter() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, owner) = setup_initialized_contract(&env);

    client.set_message(&owner, &symbol_short!("WORLD"));
    assert_eq!(client.get_message(), symbol_short!("WORLD"));
    assert_eq!(client.get_counter(), 1);

    client.set_message(&owner, &symbol_short!("SOROBAN"));
    assert_eq!(client.get_message(), symbol_short!("SOROBAN"));
    assert_eq!(client.get_counter(), 2);
}

#[test]
#[should_panic(expected = "Auth, InvalidAction")]
fn set_message_without_owner_signature_fails() {
    let env = Env::default();

    let (client, owner) = setup_initialized_contract(&env);

    client.set_message(&owner, &symbol_short!("WORLD"));
}

#[test]
fn set_message_with_mocked_owner_signature_succeeds() {
    use soroban_sdk::testutils::{MockAuth, MockAuthInvoke};

    let env = Env::default();
    let contract_id = env.register_contract(None, FaucetContract);
    let client = FaucetContractClient::new(&env, &contract_id);

    let owner = Address::generate(&env);
    client.initialize(&owner, &symbol_short!("HELLO"));

    env.mock_auths(&[MockAuth {
        address: &owner,
        invoke: &MockAuthInvoke {
            contract: &contract_id,
            fn_name: "set_message",
            args: vec![
                &env,
                owner.clone().to_val(),
                symbol_short!("WORLD").to_val(),
            ],
            sub_invokes: &[],
        },
    }]);

    client.set_message(&owner, &symbol_short!("WORLD"));

    assert_eq!(client.get_message(), symbol_short!("WORLD"));
    assert_eq!(client.get_counter(), 1);
}

#[test]
#[should_panic(expected = "Only the owner can set the message")]
fn non_owner_cannot_set_message() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, _owner) = setup_initialized_contract(&env);

    let impostor = Address::generate(&env);
    client.set_message(&impostor, &symbol_short!("HACKED"));
}

#[test]
#[should_panic(expected = "Contract not initialized")]
fn set_message_before_initialization_panics() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, FaucetContract);
    let client = FaucetContractClient::new(&env, &contract_id);

    let stranger = Address::generate(&env);
    client.set_message(&stranger, &symbol_short!("HELLO"));
}

#[test]
fn update_event_carries_new_message_and_count() {
    let env = Env::default();
    env.mock_all_auths();

    let (client, owner) = setup_initialized_contract(&env);

    client.set_message(&owner, &symbol_short!("WORLD"));

    let events = env.events().all();
    assert_eq!(events.len(), 2);

    let (_, topics, data) = events.get(1).unwrap();
    assert_eq!(topics.len(), 1);
    let topic = Symbol::try_from_val(&env, &topics.get(0).unwrap()).unwrap();
    assert_eq!(topic, symbol_short!("UPDATE"));

    let parts: Vec<Val> = data.try_into_val(&env).unwrap();
    assert_eq!(parts.len(), 2);
    let emitted_message = Symbol::try_from_val(&env, &parts.get(0).unwrap()).unwrap();
    let emitted_count: u32 = parts.get(1).unwrap().try_into_val(&env).unwrap();
    assert_eq!(emitted_message, symbol_short!("WORLD"));
    assert_eq!(emitted_count, 1);
}
