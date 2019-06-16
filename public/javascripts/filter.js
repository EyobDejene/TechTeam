let skillSlider = document.querySelector("#skill");
let skillOutput = document.querySelector(".skill");

let ageSlider = document.querySelector("#age");
let ageOutput = document.querySelector(".age");

let distanceSlider = document.querySelector("#distance");
let distanceOutput = document.querySelector(".distance");


// Age filter
let AgeFilterState = function(){
    // slider values filter
    // let ownAge = ageSlider.getAttribute('data-ownAge');
    if(ageSlider) {
        ageOutput.innerHTML = ageSlider.value;
        // ageOutput.innerHTML = ownAge+" - "+ageSlider.value;
        ageOutput.innerHTML = ageSlider.value + " years";
        ageSlider.setAttribute("value", ageSlider.value);
    }
};


// Distance filter
let DistanceFilterState = function(){
    // slider values filter
    if(distanceSlider) {
        distanceOutput.innerHTML = distanceSlider.value + " km";
        distanceSlider.setAttribute("value", distanceSlider.value);
    }
};


// Skill
let SkillFilterState = function(){
    // slider values filter
    if(skillSlider) {
        let skillState = skillSlider.value;
        skillOutput.innerHTML = skillSlider.value;
        if (this.value == 0 || skillState == 0) {
            skillOutput.innerHTML = "Beginner";
            skillSlider.setAttribute("value", skillState);
        } else if (this.value == 2 || skillState == 1) {
            skillOutput.innerHTML = "Intermediate";
            skillSlider.setAttribute("value", skillState);
        } else if (this.value == 3 || skillState == 2) {
            skillOutput.innerHTML = "Advanced";
            skillSlider.setAttribute("value", skillState);
        } else if (this.value == 4 || skillState == 3) {
            skillOutput.innerHTML = "Expert";
            skillSlider.setAttribute("value", skillState);
        }
        else {
            skillOutput.innerHTML = this.value;
            skillSlider.setAttribute("value", skillState);
        }
    }
};

// Run FilterState
SkillFilterState();
AgeFilterState();
DistanceFilterState();
// Update the current slider value
if(skillSlider || ageSlider || distanceSlider) {
    skillSlider.oninput = SkillFilterState;
    ageSlider.oninput = AgeFilterState;
    distanceSlider.oninput = DistanceFilterState;
}

