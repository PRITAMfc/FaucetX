#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

const OWNER: Symbol = symbol_short!("OWNER");
const MESSAGE: Symbol = symbol_short!("MESSAGE");
const COUNTER: Symbol = symbol_short!("COUNTER");

#[contracttype]
pub enum DataKey {
    Owner,
    Message,
    Counter,
}

#[contract]
pub struct FaucetContract;

#[contractimpl]
impl FaucetContract {
    /// Initialize the contract with an owner and a starting message
    pub fn initialize(env: Env, owner: Address, message: Symbol) {
        if env.storage().instance().has(&DataKey::Owner) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&DataKey::Owner, &owner);
        env.storage().instance().set(&DataKey::Message, &message);
        env.storage().instance().set(&DataKey::Counter, &0u32);

        env.events().publish(
            (symbol_short!("INIT"),),
            (owner, message),
        );
    }

    /// Get the current stored message
    pub fn get_message(env: Env) -> Symbol {
        env.storage()
            .instance()
            .get(&DataKey::Message)
            .unwrap_or_else(|| symbol_short!("EMPTY"))
    }

    /// Set a new message (requires authorization from the owner)
    pub fn set_message(env: Env, owner: Address, new_message: Symbol) {
        owner.require_auth();

        let stored_owner: Address = env
            .storage()
            .instance()
            .get(&DataKey::Owner)
            .expect("Contract not initialized");

        if owner != stored_owner {
            panic!("Only the owner can set the message");
        }

        env.storage().instance().set(&DataKey::Message, &new_message);

        let counter: u32 = env
            .storage()
            .instance()
            .get(&DataKey::Counter)
            .unwrap_or(0);
        env.storage()
            .instance()
            .set(&DataKey::Counter, &(counter + 1));

        env.events().publish(
            (symbol_short!("UPDATE"),),
            (new_message, counter + 1),
        );
    }

    /// Get the update counter
    pub fn get_counter(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::Counter)
            .unwrap_or(0)
    }

    /// Get the contract owner
    pub fn get_owner(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&DataKey::Owner)
            .expect("Contract not initialized")
    }
}
