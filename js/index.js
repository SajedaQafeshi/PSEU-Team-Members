let modal = document.getElementById('modalBar');
let link = document.getElementById('modalLink');
let close = document.getElementById('close');
let cancel = document.getElementById('cancel');
let save = document.getElementById('save');
let del = document.getElementById('delete');
let name = document.getElementById('name');
let email = document.getElementById('email');
let major = document.getElementById('major');
let role = document.getElementById('role');
let biography = document.getElementById('biography');
let newBtn = document.getElementById('save');
let members =JSON.parse(localStorage.getItem('memberlist'));

close.onclick = function () {
    modal.style.display = "none";
}

cancel.onclick = function () {
    modal.style.display = "none";
}

window.onload = function () {
    membersf(JSON.parse(localStorage.getItem('memberlist')));
    document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";
}

newBtn.onclick = function () {

    if (name.value != "" && email.value != "" && major.value != "" &&
    role.value != "" && biography.value != "" ) {
        members.push({
            name: name.value,
            email:email.value,
            major:major.value,
            role:role.value,
            Biography:biography.value
        });
        localStorage.setItem('memberlist',JSON.stringify(members));
        
        name.value = "";
        email.value = "";
        major.value = "";
        role.value = "";
        biography.value = "";
        membersf(JSON.parse(localStorage.getItem('memberlist')));
        document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";
    }
    else{
        alert("pleace add all attribute");
    }
}


function membersf(members2) 
{
    document.getElementById("member-list").innerHTML="";
    members2.forEach(memberItem => {
       document.getElementById("member-list").innerHTML += member(memberItem);
    });
    
}

function defaultFun() {
    document.getElementById('sort').selectedIndex="0";
    document.getElementById('major-filter').selectedIndex="0";
    document.getElementById('role-filter').selectedIndex="0";
    membersf(JSON.parse(localStorage.getItem('memberlist')));
    document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";
}

function Modal(item) {
    let node = members.find(function (member) {
        return member.email == item;
    });
    modal.style.display = "flex";
    document.getElementById('modalName').value = node.name;
    document.getElementById('modalEmail').value = node.email;
    document.getElementById('modalMajor').value = node.major;
    document.getElementById('modalRole').value = node.role;
    document.getElementById('modalBio').value = node.Biography;
    document.getElementById('originalEmail').innerHTML = node.email;
    
    
}

function member(item) {
    return `
    <div class="member-item">
    <div class="member-remove">
        <button onclick="deleteMember('${item.email}')">&#45;</button>
    </div>
    <div class="member-data">
        <h1 id="modalID" onclick="Modal('${item.email}')">${item.name}</h1>
        <h3> ${item.email}/ ${item.major} / ${item.role}</h3>
        <p> ${item.Biography} </p>
    </div>
</div>
    `;
}

function deleteMember(email) {
    members.splice(function (member) {
        member.email == email;
    },1);
    localStorage.setItem('memberlist',JSON.stringify(members));
    modal.style.display = "none";
    membersf(JSON.parse(localStorage.getItem('memberlist')));
    document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";
}

function updateMember(email) {
    members.forEach(function (member) {
        if (member.email == email) {
            member.email = document.getElementById('modalEmail').value;
            member.name =document.getElementById('modalName').value;
            member.major =document.getElementById('modalMajor').value;
            member.role =document.getElementById('modalRole').value;
            member.Biography =document.getElementById('modalBio').value;
        }
    });
    localStorage.setItem('memberlist',JSON.stringify(members));
    membersf(JSON.parse(localStorage.getItem('memberlist')));
    Modal(document.getElementById('modalEmail').value);
    modal.style.display = "none";
}

function sortMember() {
    let value = document.getElementById('sort').value;
    if (value == 1) {
        membersf(members.sort(function(a,b){
            return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
          }));
        document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";        
    } else if (value == 2) {
        membersf(members.sort(function(a,b){
            return (a.name > b.name ? -1 : (a.name < b.name ? 1 : 0));
          })); 
        document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";        

    } else if (value == 3){
        membersf(JSON.parse(localStorage.getItem('memberlist')).reverse());  
        document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";        

    } else {
        membersf(JSON.parse(localStorage.getItem('memberlist')));
        document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";        

    }
}

function majorFilter() {
    let majorValue = document.getElementById('major-filter').value; 
    let memberList = members.filter(function (member) {
        return member.major == majorValue;
    });
    membersf(memberList);
    document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";
}


function roleFilter() {
    let roleValue = document.getElementById('role-filter').value; 
    let memberList = members.filter(function (member) {
        return member.role == roleValue;
    });
    membersf(memberList);
    document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";

}


function search() {
    let charSearch = document.getElementById('search').value;
    let memberList = members.filter(function (member) {
        return member.name.includes(charSearch);
    });
    membersf(memberList);
    document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";
}