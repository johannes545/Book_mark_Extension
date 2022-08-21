'use strict';

const inputBtn = document.getElementById("input_btn");
const inputTxt = document.getElementById("input-el");
const deleteBtn = document.getElementById("delete_btn");
const saveBtn = document.getElementById("save_tab")
let myLeads = [];
let ulEl = document.getElementById("ul_el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage)

// render local storage leads. So the browser can remember your saved links
lead()

function lead(){
    if(leadsFromLocalStorage){
        myLeads = leadsFromLocalStorage
        render(myLeads)
    }
}



function saveLead(){
    myLeads.push(inputTxt.value)
}



//Add Lead to screen and localStorage
inputBtn.addEventListener("click",function(){
    saveLead();
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    lead()
    render(myLeads);
    console.log(localStorage.getItem("myLeads"))
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
    inputTxt.value = "";
})

saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
for(let i = 0;i < leads.length;i++){
    listItems += `<li><a href='https://${leads[i]}' target='_blank'> ${leads[i]} </a></li>`
   
}

ulEl.innerHTML = listItems
inputTxt.value = ""
}