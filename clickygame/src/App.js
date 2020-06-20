import React, { Component } from "react";
import FriendCard from "./components/DogCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import dogs from "./chars.json";

class App extends Component {
	state = {
    dogs,
    score: 0,
    topScore: 0,
    message: "Click on a dog to earn points, but don't select a dog more than once!",
  };


  handleClick = (id, clicked) => {

		const imageOrder = this.state.dogs;

		if (clicked) {
			imageOrder.forEach((image, index) => {
				imageOrder[index].clicked = false;
			});
			return this.setState({
				image: imageOrder.sort(() => Math.random() - 0.5),
				message: "bummer! That was wrong!",
				score: 0
			})
		}
		else {
			imageOrder.forEach((image, index) => {
				if (id === image.id) {
					imageOrder[index].clicked = true;
				}
			});

			const { topScore, score } = this.state;
			const newScore = score + 1;
			const newTopScore = newScore > topScore ? newScore : topScore;

			return this.setState({
				image: imageOrder.sort(() => Math.random() - 0.5),
				message: "You Guessed Correctly!",
				score: newScore,
				topScore: newTopScore,
			})
		}
	};


  // Map over this.state.dogs and render a DogCard component for each dog object
  render() {
    return (
			<div>
			<Nav></Nav>
      <Wrapper>
				
          
        <Title>
					<div className="text-center">
 						<h1 id = "message-title">{this.state.message}</h1>
 					</div>
 					<div className="gameScores text-center">
 						<p><strong>Score:</strong> {this.state.score} | <strong>Top Score:</strong> {this.state.topScore}</p>
 					</div> 
					</Title>
				
        {this.state.dogs.map(dogs => (
          <FriendCard
            id={dogs.id}
            key={dogs.id}
            name={dogs.name}
						image={dogs.image}
						clicked={dogs.clicked}
						handleClick={this.handleClick}
            />
        ))}
      </Wrapper>
			</div>
    );
  }
}

export default App;