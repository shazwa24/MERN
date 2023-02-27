var aname = document.getElementById("name");
  var aemail = document.getElementById("email");
  var aphone = document.getElementById("phone");
  var atype= document.getElementById("male");
  var uid= document.getElementById("uid");
  var form= document.getElementById("form");
  var addbtn= document.getElementById("addbtn");
  var editbtn= document.getElementById("editbtn");
  var alert= document.getElementById("alert");
  var users = [];
  var allusers;
  fetch('https://dummyjson.com/users?limit=10&select=id,firstName,lastName,email,gender,phone')
  .then(
      res => {
        res.json().then((data)=>{   
          
          for(var i in data){
              var a=data[i]
              users.push(a);
          }     
            console.log(users);
            if (users.length > 0) {
              allusers = users[0];
              console.log(allusers);
              users[0].forEach((itemData) => {
                displayCard(itemData.id, itemData.firstName+" "+itemData.lastName,itemData.email,itemData.phone,itemData.gender)
              });
            }
          }
        )
      }
    )

  // function validate(){
  //   debugger
  //     if(namevalidate()){
  //       if(emailvalidate()){
  //         if(phonevalidate()){
  //           addContact();
  //         }
  //       }
  //     }
  //   }

  //   function namevalidate(){
  //       var nr="/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/";
  //       if(nr.test(aname.value))
  //       {
  //         return true;
  //       }
  //       else
  //       {
  //         alert.innerHTML += "<div class='alert alert-danger' role='alert'>"+
  //         "Invalid Name"+
  //       "</div>";
  //         return false;
  //       }
  //   }

  //   function emailvalidate(){
  //     var er="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
  //       if(er.test(aemail.value))
  //       {
  //         return true;
  //       }
  //       else
  //       {
  //         alert.innerHTML += "<div class='alert alert-danger' role='alert'>"+
  //         "Invalid Email"+
  //       "</div>";
  //         return false;
  //       }
  //   }

  //   function phonevalidate(){
  //     var pr="/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/";
  //       if(pr.match(aphone.value))
  //       {
  //         return true;
  //       }
  //       else
  //       {
  //         alert.innerHTML += "<div class='alert alert-danger' role='alert'>"+
  //         "Invalid Phone"+
  //       "</div>";
  //         return false;
  //       }
  //   }

  function addContact(){
        var type='';
        if (atype.checked)
            type = 'male';
        else
            type = 'female';
        id=100;
        var img = document.getElementById("choose-file");
        displayCard(id, aname.value,aemail.value,aphone.value,type);
        fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: allusers.length+1,
          firstName: aname.value.split(" ")[0],
          lastName: aname.value.split(" ")[1],
          email: aemail.value,
          phone: aphone.value,
          gender: type
        })
      })
      .then(res => res.json())
      .then(console.log);
      var newuser = {
        id: allusers.length+1,
        firstName: aname.value.split(" ")[0],
        lastName: aname.value.split(" ")[1],
        email: aemail.value,
        phone: aphone.value,
        gender: type
      }
      allusers.push(newuser);
      console.log(allusers);
      form.reset();
  }

  function deleteContact(clickedid){
    var x = document.getElementById(clickedid);
    x.remove();
    
  fetch('https://dummyjson.com/users/'+clickedid, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then(console.log);
  var found = getid(clickedid);
  allusers.splice(found, 1);
  console.log(allusers);

  }

  function editContact(clickedid){
    editbtn.disabled = false;
    addbtn.disabled = true;
    var x = document.getElementById(clickedid);
    console.log(x);
    var name = x.querySelector("#namecard");
    var email = x.querySelector("#emailcard");
    var phone = x.querySelector("#phonecard");
    var type= x.querySelector("#btncard");
    aname.value = name.innerHTML.trim();
    aemail.value = email.innerHTML.trim();
    aphone.value = phone.innerHTML.trim();
    console.log(type);
    if (type.innerHTML.trim() == "male"){
      console.log("male");
      document.getElementById("male").checked;
    }
    else{
      console.log("female");
      document.getElementById("female").checked;
    }
    var found = getid(clickedid);
    uid.value = found[0].id;
    console.log(found[0].id);
  }

  function edit(){
    console.log("edited");
    var gtype='';
        if (atype.checked)
            gtype = 'male';
        else
            gtype = 'female';
    console.log("userid"+uid.value);
    fetch('https://dummyjson.com/users/' +uid.value, {
    method: 'PUT', /* or PATCH */
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: uid.value,
      firstName: aname.value.trim().split(" ")[0],
      lastName: aname.value.trim().split(" ")[1],
      email: aemail.value.trim(),
      phone: aphone.value.trim(),
      gender: gtype
    })
  })
  .then(res => res.json())
  .then(console.log);
  console.log("edited json");
  var x = document.getElementById(uid.value);
    console.log(x);
    var name = x.querySelector("#namecard");
    var email = x.querySelector("#emailcard");
    var phone = x.querySelector("#phonecard");
    var type= x.querySelector("#btncard");
    name.innerHTML=aname.value.trim();
    email.innerHTML=aemail.value.trim();
    phone.innerHTML=aphone.value.trim();
    type.innerHTML = gtype;
    if (type == "male")
    type.style.backgroundColor = "green";
    else
    type.style.backgroundColor = "#0c5d97";

    form.reset();
    editbtn.disabled = true;
    addbtn.disabled = false;
  }

  function getid(clickid) {
    return allusers.filter(
        function(allusers){ return allusers.id == clickid }
    );
  }

  function displayCard(id, name, email, phone, gender){
      var card = "<div id = '"+ id + "' class='card bg-light mt-3'> <div class='row'> "+
          "<div class='col-7'> "+
          "<div class='card-body text-dark'> "+
          "<h5 class='card-title' style='color: #0c5d97;' id='namecard'> "+ name  +" </h5> "+
          "<p> <img src='email.png' width='20' "+
          "height='19' class='card-text' alt=''> <span id = 'emailcard'>"+ email+"</span> <br>"+
          "<img src='phone.png' width='20' "+
          "height='19' class='card-text' alt=''> <span id = 'phonecard'>" + phone + "</span>"+
          "</p> "+
          "<button id = '"+ id + "' type='button'  onclick='editContact(this.id)' class='btn btn-dark input rounded-0'>Edit</button> "+
          "<button id = '"+ id + "' type='button'  onclick='deleteContact(this.id)' class='btn btn-danger input rounded-0'>Delete</button> "+
          "</div> "+
          "</div> "+
          "<div class='col text-end px-5'> "+
          "<button id = 'btncard' type='text' class='btn mt-3' "+
          "style='background-color: ";
          if (gender == "male")
            card += "green";
          else
            card += "#0c5d97";
          card+= "; color: white;'> "+ gender+" </button> <br> "+
          "<img src='";
          if (gender == "male")
            card += "person2";
          else
            card += "person1";
          card+= ".png' width='100' height='100' "+
          "class='card-text my-3' alt=''> "+
          "</div> "+
          "</div> "+
          "</div> ";
      document.getElementById('card').innerHTML+=card;
  }

