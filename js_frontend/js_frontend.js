export function process_all_teams(func) {
	fetch('/teams')
	.then((response) => {
		return response.json();
	})
	.then((result) => {
		return getTeams(result);
	})
	.then((results) => {
		let con = results.map(r => new Team(r));
		func(con);
    })
	.catch((error) => console.log(error))
}

export function js_avg_goals(results) {
	let highestavg = 0;
	let winner = '';

	for(let i in results){
		let sum = 0;
		for(let j = 0; j < 6; j++){
			sum += parseInt(results[i].players[j].charAt(45));
		}
		for(let j = 6; j < 12; j++){
			sum += parseInt(results[i].players[j].charAt(46));
		}
		for(let j = 12; j < 15; j++){
			sum += parseInt(results[i].players[j].charAt(45));
		}
		let avg = sum / 15;
		if(avg > highestavg){
			highestavg = avg;
			winner = results[i].name;
		}
	}
	console.log('Highest average goals: ' + highestavg + ' Team: ' + winner);
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

	return Promise.all(promises)
    .catch((error) => console.log(error))
}
