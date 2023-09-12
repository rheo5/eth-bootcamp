// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
    }
    
    Project[] projects;

    function findWinner() external view returns(Project memory) {
        require(projects.length > 0, "No projects available");

        uint winner;
        uint highest = 0;
        uint avgRating = 0;

        for(uint i=0; i<projects.length; i++) {
            avgRating = 0;
            for (uint j=0; j<projects[i].ratings.length; j++) {
                avgRating += projects[i].ratings[j];
            }
            avgRating /= projects[i].ratings.length;
            if (avgRating > highest) {
                highest = avgRating;
                winner = i;
            }
        }

        return projects[winner];
    }

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0)));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }
}
