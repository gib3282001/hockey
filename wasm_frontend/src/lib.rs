mod utils;

use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};

// #[derive(Serialize, Deserialize)]
// pub struct Player {
// 	name: String,
// 	position: String,
// 	goals: u32,
// 	asists: u32,
// }

#[derive(Serialize, Deserialize)]
pub struct Team {
	name: String,
	players: Vec<String>
}

#[wasm_bindgen]
pub fn wasm_avg_goals(results: &JsValue) {
	match results.into_serde::<Vec<Team>>() {
		Ok(teams) => {
			let mut highestAvg: f32 = 0.0;
			let mut highestTeam = "aa";
			for t in teams.iter() {
				let mut sum = 0;
				for i in 0..6 {
					let ch = t.players[i].chars().nth(45).unwrap().to_string();
					let num: u32 = ch.parse().unwrap();
					sum += num;
				}
				for i in 6..12 {
					let ch = t.players[i].chars().nth(46).unwrap().to_string();
					let num: u32 = ch.parse().unwrap();
					sum += num;
				}
				for i in 12..15 {
					let ch = t.players[i].chars().nth(45).unwrap().to_string();
					let num: u32 = ch.parse().unwrap();
					sum += num;
				}
				let avg: f32 = (sum / 15) as f32;
				if avg > highestAvg {
					highestAvg = avg;
					highestTeam = &t.name;
				}
			}
			web_sys::console::log_2(&"Highest average: ".into(), &JsValue::from_serde(&highestAvg).unwrap());
			web_sys::console::log_2(&"Team: ".into(), &JsValue::from_serde(&highestTeam).unwrap());
		}
		Err(_) => {web_sys::console::log_1(&"Could not parse teams into a Rust vector".into())}
	}
}
