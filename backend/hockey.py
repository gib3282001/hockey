from flask import Flask, render_template, request, abort
import json
import random
import string

app = Flask(__name__)

teams = ['meerkats', 'elephants', 'antelopes', 'seals', 'seagulls', 'starfish', 'deer', 'rabbits', 'squirrels', 'flamingos', 'salamanders', 'cranes']
stats = {}
class Player:
	def __init__(self, name, position, goals, asists):
		self.name = name
		self.position = position
		self.goals = goals
		self.asists = asists
	
	def toJson(self):
		return json.dumps(self, default=lambda o: o.__dict__)

	def __repr__(self):
		return 'Player: {}'.format(self.name)

def randStr(chars = string.ascii_letters + string.digits, N=6):
	return ''.join(random.choice(chars) for _ in range(N))

@app.route("/")
def root_page():
	return render_template("base.html")

@app.route("/teams", methods=['GET'])
def get_teams():
	return json.dumps(teams)

@app.route("/teams/<team_name>", methods=['GET'])
def generate_players(team_name):
	for t in teams:
		stats[t] = []
		stats[t].append(team_name)
		random.seed(t)
		for i in range(6):
			stats[t].append(Player(randStr(), 'D', random.randint(1, 9), random.randint(1, 10)).toJson())
		for i in range(3):
			stats[t].append(Player(randStr(), 'LW', random.randint(1, 9), random.randint(1, 10)).toJson())
		for i in range(3):
			stats[t].append(Player(randStr(), 'RW', random.randint(1, 9), random.randint(1, 10)).toJson())
		for i in range(3):
			stats[t].append(Player(randStr(), 'C', random.randint(1, 9), random.randint(1, 10)).toJson())
	return json.dumps(stats[team_name])
		

if __name__ == "__main__":
	app.run()
