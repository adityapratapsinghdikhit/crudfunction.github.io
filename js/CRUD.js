/** Global variables */
var users = [];
var fullnameEl = document.getElementById("name");
var mailEl = document.getElementById("mail");
var dobEl = document.getElementById("dob");
var genderEl = document.getElementById("gender");
var maleEl = document.getElementById("m");
var femaleEl = document.getElementById("f");
var othersEl = document.getElementById("o");
var hobbyEl = document.getElementById("hobby");
var countryEl = document.getElementById("countryId");
var stateEl = document.getElementById("stateId");
var cityEl = document.getElementById("cityId");
var adduserEl = document.getElementById("add");
var updateEl = document.getElementById("update");
var form = document.getElementById("u-form");
var clsbtn = document.querySelector("#cls");

/** Global variables end */

var allinputs = form.querySelectorAll("INPUT");

clsbtn.onclick = function(){
    var i;
    for(i=0;i<allinputs.length;i++){
        allinputs[i].value = "";
    }
}

form.onsubmit = function(e)
{
    e.preventDefault();
    userdata();
    form.reset('');
    getDataFromLocal();
    clsbtn.click();
}

if(localStorage.getItem("users") != null)
{
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
}
function userdata()
{
    users.push
    ({
        name : fullnameEl.value,
        mail : mailEl.value,
        dob : dobEl.value,
        gender : genderEl.value,
        hobby : hobbyEl.value,
        country : countryEl.value,
        state : stateEl.value,
        city : cityEl.value
    });
    var userstring = JSON.stringify(users);
    localStorage.setItem("users",userstring);
    swal("User Added!", "Thanks for registering", "success", {
        button: "Okay",
      });
}

/** list of all users */
var tabledata = document.getElementById("table-data");
const getDataFromLocal = () =>
{
    tabledata.innerHTML = "";
    users.forEach((data,index)=>
    {
        tabledata.innerHTML += `
        
        <tr index = "${index}">
            <td>${index+1}</td>
            <td>${data.name}</td>
            <td>${data.mail}</td>
            <td>${data.dob}</td>
            <td>${data.gender}</td>
            <td>${data.hobby}</td>
            <td>${data.country}</td>
            <td>${data.state}</td>
            <td>${data.city}</td>
            <td>
            <button class="btn edt-btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"><img src="Images/icons8-pencil-25.png" alt=""></button>
            <button class="btn btn-danger del-btn"><img src="Images/icons8-remove-25.png" alt=""></button>
            </td>
        </tr>
        
        `;
    });
    var adduserbtn = document.getElementById("adduser-btn");

    adduserbtn.onsubmit = function()
    {
        adduserEl.disabled = false;
        updateEl.disabled = true;
    }
    /** Deleting user */
    var i;
    var deletebtn = document.querySelectorAll(".del-btn");
    for(i=0;i<deletebtn.length;i++)
    {
        deletebtn[i].onclick = function(){
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal
            ({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover the user data!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                users.splice(id,1);
                localStorage.setItem("users",JSON.stringify(users));
                tr.remove();
                swal("Poof! The user data has been deleted!", {
                  icon: "success",
                });
              } else {
                swal("The user data is safe!");
              }
            });
        }
    }
    /** Updating users data */
    var editbtn = document.querySelectorAll(".edt-btn");
    for(i=0;i<editbtn.length;i++)
    {
        editbtn[i].onclick = function()
        {
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("td");
            var index = tr.getAttribute("index");
            var name = td[1].innerHTML;
            var mail = td[2].innerHTML;
            var dob = td[3].innerHTML;
            var gender = td[4].innerHTML;
            var hobby = td[5].innerHTML;
            var country = td[6].innerHTML;
            var state = td[7].innerHTML;
            var city = td[8].innerHTML;

            adduserEl.disabled = true;
            updateEl.disabled = false;

            fullnameEl.value = name;
            mailEl.value = mail;
            dobEl.value = dob;
            genderEl.value = gender;
            hobbyEl.value = hobby;
            countryEl.value = country;
            stateEl.value = state;
            cityEl.value = city;

            updateEl.onclick = function(e)
            {
                e.preventDefault();
                users[index] = {
                    
                    name : fullnameEl.value,
                    mail : mailEl.value,
                    dob : dobEl.value,
                    gender : genderEl.value,
                    hobby : hobbyEl.value,
                    country : countryEl.value,
                    state : stateEl.value,
                    city : cityEl.value

                }
                localStorage.setItem("users",JSON.stringify(users));
                clsbtn.click();
                getDataFromLocal();
                adduserEl.disabled = false;
                updateEl.disabled = true;
                swal("Updation Successfull!", "User data updated", "success", {
                    button: "Okay!",
                  });
            }
        }
    }

}
getDataFromLocal();
