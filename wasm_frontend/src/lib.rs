mod utils;

use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Player {
	name: String,
	position: String,
	goals: u32,
	assists: u32,
}

#[derive(Serialize, Deserialize)]
pub struct Team {
	name: String,
	players: Vec<Player>
}

#[wasm_bindgen]
pub fn wasm_avg_goals(results: &JsValue) {
	// Your code here
}
