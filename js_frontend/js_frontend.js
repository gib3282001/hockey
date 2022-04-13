export function process_all_teams(func) {
	fetch('/teams')
	.then((response) => {
		return response.json();
	})
	.then((result) => {
		return getTeams(result);
	})
	.then((results) => {
		func(results);
		js_avg_goals(results);
	})
	.catch(() => console.log("there was an error"))
}

export function js_avg_goals(results) {
	console.log(results);
	for(i of results){
		console.log(i);
	}
	console.log(results);
}

function Team(res){
	this.name = res[0];
	this.players = res.slice(-15);
}

function getTeams(result){ 
	let promises = Array(12);
	for(let i=0; i < result.length; i++){
		let url = '/teams/' + result[i];
		promises[i] = fetch(url).then((response) => {return response.json()});
	}

	let teams  = Array(12);
	Promise.all(promises)
	.then((res) => {
		for(let i=0; i < res.length; i++){
			teams[i] = new Team(res[i]);
		}
	})
	.catch(() => console.log("There was an error in getTeams"))

	return teams;
}
