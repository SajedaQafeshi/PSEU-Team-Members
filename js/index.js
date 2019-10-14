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
let indexAdd = document.getElementById('indexAdd').value;
let members =JSON.parse(localStorage.getItem('memberlist'));


close.onclick = function () {
    modal.style.display = "none";
}

cancel.onclick = function () {
    modal.style.display = "none";
}

window.onload = function () {
    if (members == null) {
        members =[];
    }
    membersf(members);
    document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";
}

newBtn.onclick = function () {

    if (name.value != "" && email.value != "" && major.value != "" &&
    role.value != "" && biography.value != "" ) {
        if (members.find(member => member.email == email.value) == undefined) {
            let time = new Date();
            if (indexAdd != "") {
                members.splice(indexAdd, 0, {
                    name: name.value,
                    email:email.value,
                    major:major.value,
                    role:role.value,
                    Biography:biography.value,
                    time:time.getDate() + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
                });
            } else {
                members.push({
                    name: name.value,
                    email:email.value,
                    major:major.value,
                    role:role.value,
                    Biography:biography.value,
                    time:time.getDate() + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
                });
            }

            localStorage.setItem('memberlist',JSON.stringify(members));
            name.value = "";
            email.value = "";
            major.value = "";
            role.value = "";
            biography.value = "";
            membersf(JSON.parse(localStorage.getItem('memberlist')));
            document.getElementById('itemNumber').innerHTML = members.length + " ITEMS";
        } else{
            alert("pleace add another Email");
        }
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
    if (email == document.getElementById('modalEmail').value ||
      members.find(member => member.email == email) != undefined) {
        
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
    } else {
        alert("pleace add another Email");
    }
}

function search() {
    let charSearch = document.getElementById('search').value;
    let memberList = members.filter(function (member) {
        return member.name.includes(charSearch);
    });
    membersf(memberList);
    document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";
}

function Filter() {
    let majorValue = document.getElementById('major-filter').value; 
    let roleValue = document.getElementById('role-filter').value;
    let memberList;

    if (roleValue == "" ) {
        memberList = members.filter(function (member) {
            return member.major == majorValue;
        });
        sortFilter(memberList);

    } else if (majorValue == "") {
        memberList = members.filter(function (member) {
            return member.role == roleValue;
        });
        sortFilter(memberList);

    } else{
        memberList = members.filter(function (member) {
            return (member.role == roleValue && member.major == majorValue);
        });
        sortFilter(memberList);
    }
    document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";
    
}

function sortFilter(memberList) {
    let value = document.getElementById('sort').value;
    if (value == 1) {
        membersf(memberList.sort(function(a,b){
            return (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
          }));
        document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";        
    } else if (value == 2) {
        membersf(memberList.sort(function(a,b){
            return (a.name > b.name ? -1 : (a.name < b.name ? 1 : 0));
          })); 
        document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";        

    } else if (value == 3){
        membersf(memberList.sort(function(a,b){
            return (a.time > b.time ? -1 : (a.time < b.time ? 1 : 0));
          }));   
        document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";        

    } else {
        membersf(memberList.sort(function(a,b){
            return (a.time < b.time ? -1 : (a.time > b.time ? 1 : 0));
          })); 
        document.getElementById('itemNumber').innerHTML = memberList.length + " ITEMS";        

    }
}
