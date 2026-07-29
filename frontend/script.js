let debounceTimer;


/* =====================================
        ZOMATO NOTES FRONTEND
===================================== */

const BASE_URL = "http://127.0.0.1:8000";

/* =====================================
        JWT TOKEN
===================================== */

function saveToken(token){

    localStorage.setItem("token",token);

}

function getToken(){

    return localStorage.getItem("token");

}

function removeToken(){

    localStorage.removeItem("token");

}

/* =====================================
        AUTH HEADER
===================================== */

function authHeader(){

    return {

        "Authorization":"Bearer " + getToken(),

        "Content-Type":"application/json"

    }

}



/* =====================================
        DOM
===================================== */

const noteForm=document.getElementById("noteForm");

const notesContainer=document.getElementById("notesContainer");

const loading=document.getElementById("loading");

const error=document.getElementById("error");

const searchInput=document.getElementById("searchInput");

const categoryTree = document.getElementById("categoryTree");

const smartSearchInput=document.getElementById("smartSearchInput");

const importFile = document.getElementById("importFile");

const importBtn = document.getElementById("importBtn");

const loginBtn=document.getElementById("loginBtn");

const logoutBtn=document.getElementById("logoutBtn");

let editingNoteId = null;

const submitBtn = noteForm.querySelector("button");

const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let deleteNoteId = null;

const cancelEditBtn = document.getElementById("cancelEditBtn");

function showLoader(){

    loading.classList.remove("hidden");

}

function hideLoader(){

    loading.classList.add("hidden");

}


/* =====================================
        INIT
===================================== */

window.addEventListener("DOMContentLoaded",()=>{

    console.log("Frontend Ready");

    loadCategoryTree();

    if(getToken()){

        loginBtn.style.display="none";
        logoutBtn.style.display="block";

        loadNotes();

    }

});


const CATEGORY_TREE = {
    name: "All Tags",
    children: [
        {
            name: "Work",
            children: [
                { name: "Standups", children: [] },
                { name: "Retros", children: [] }
            ]
        },
        {
            name: "Personal",
            children: [
                {
                    name: "Health",
                    children: [
                        {
                            name: "Fitness",
                            children: []
                        }
                    ]
                },
                {
                    name: "Recipes",
                    children: []
                }
            ]
        },
        {
            name: "Travel",
            children: []
        }
    ]
};


function renderCategory(node) {

    const li = document.createElement("li");

    li.textContent = node.name;

    if (node.children.length > 0) {

        const ul = document.createElement("ul");

        ul.style.display = "none";

        li.style.cursor = "pointer";

        li.addEventListener("click", function (e) {

            e.stopPropagation();

            ul.style.display =
                ul.style.display === "none"
                    ? "block"
                    : "none";

        });

        node.children.forEach(child => {

            ul.appendChild(renderCategory(child));

        });

        li.appendChild(ul);

    }

    return li;

}


function loadCategoryTree() {

    const ul = document.createElement("ul");

    ul.appendChild(renderCategory(CATEGORY_TREE));

    categoryTree.innerHTML = "";

    categoryTree.appendChild(ul);

}


/* =====================================
        AUTH MODAL
===================================== */

const authModal=document.getElementById("authModal");

const modalTitle=document.getElementById("modalTitle");

const submitAuth=document.getElementById("submitAuth");

const toggleAuth=document.getElementById("toggleAuth");

const nameInput=document.getElementById("name");

const emailInput=document.getElementById("email");

const passwordInput=document.getElementById("password");

let isLogin=true;

loginBtn.addEventListener("click",()=>{

    authModal.style.display="flex";

});

logoutBtn.addEventListener("click",()=>{

    removeToken();

    location.reload();

});

toggleAuth.addEventListener("click",()=>{

    isLogin=!isLogin;

    if(isLogin){

        modalTitle.innerText="Login";

        submitAuth.innerText="Login";

        nameInput.style.display="none";

        toggleAuth.innerHTML='Don\'t have an account? <span>Register</span>';

    }else{

        modalTitle.innerText="Register";

        submitAuth.innerText="Register";

        nameInput.style.display="block";

        toggleAuth.innerHTML='Already have an account? <span>Login</span>';

    }

});



/* =====================================
        TOKEN HELPERS
===================================== */

function saveToken(token){

    localStorage.setItem("token",token);

}

function getToken(){

    return localStorage.getItem("token");

}

function removeToken(){

    localStorage.removeItem("token");

}


/* =====================================
        LOGIN / REGISTER
===================================== */

submitAuth.addEventListener("click",async()=>{

    const email=emailInput.value.trim();

    const password=passwordInput.value.trim();

    if(email==="" || password===""){

        showToast("Fill all fields");

        return;

    }

    if(isLogin){

        login(email,password);

    }

    else{

        const name=nameInput.value.trim();

        if(name===""){

            showToast("Enter Name");

            return;

        }

        register(name,email,password);

    }

});



async function register(name,email,password){

    try{

        const response=await fetch(`${BASE_URL}/users`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name,
                email,
                password

            })

        });

        if(!response.ok){

            throw new Error("Registration Failed");

        }

        showToast("Registration Successful");

        isLogin=true;

        modalTitle.innerText="Login";

        submitAuth.innerText="Login";

        nameInput.style.display="none";

    }

    catch(error){

        showToast(error.message);

    }

}




async function login(email,password){

    try{

        const formData=new URLSearchParams();

        formData.append("username",email);

        formData.append("password",password);

        const response=await fetch(`${BASE_URL}/login`,{

            method:"POST",

            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },

            body:formData

        });

        if(!response.ok){

            throw new Error("Invalid Credentials");

        }

        const data=await response.json();

        saveToken(data.access_token);

        authModal.style.display="none";

        loginBtn.style.display="none";

        logoutBtn.style.display="block";

        showToast("Login Successful");

    }

    catch(error){

        showToast(error.message);

    }

}



/* ===============================
        LOGOUT
================================ */

logoutBtn.addEventListener("click",()=>{

    removeToken();

    logoutBtn.style.display="none";

    loginBtn.style.display="block";

    notesContainer.innerHTML="";

    showToast("Logged Out");

});


/* ===============================
        AUTH HEADER
================================ */

function authHeaders(){

    return{

        "Authorization":`Bearer ${getToken()}`,
        "Content-Type":"application/json"

    };

}


async function loadNotes(){

    showLoader();

    try{

        const response = await fetch(`${BASE_URL}/notes`,{
            headers: authHeaders()
        });

        if(!response.ok){
            throw new Error("Unable to load notes");
        }

        const notes = await response.json();

        renderNotes(notes);

    }

    catch(error){

        console.log(error);

    }

    finally{

    hideLoader();

}

}



function searchNotes(){

    const keyword = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".note-card");

    cards.forEach(card=>{

        const text = card.innerText.toLowerCase();

        if(text.includes(keyword)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}
searchInput.addEventListener("input", () => {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        console.log("Searching...");
        searchNotes();


    }, 400);

});

smartSearchInput.addEventListener("input", smartSearch);

importBtn.addEventListener("click", importNotes);


async function smartSearch(){

    const query = smartSearchInput.value.trim();

    if(query === ""){
        loadNotes();
        return;
    }

    try{

        const response = await fetch(`${BASE_URL}/notes/semantic-search`,{

            method:"POST",

            headers:authHeaders(),

            body:JSON.stringify({
                query:query
            })

        });

        if(!response.ok){
            throw new Error("Smart Search Failed");
        }

const data = await response.json();

console.log(data.results);
console.log(data.results[0]);

renderNotes(data.results);

    }

    catch(error){

        showToast(error.message);

    }

}

smartSearchInput.addEventListener("input", smartSearch);


async function importNotes() {

    const file = importFile.files[0];

    if (!file) {
        showToast("Please select a TXT file");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

        console.log("Token:", getToken());

        const response = await fetch(`${BASE_URL}/notes/import`, {

            method: "POST",

            headers: {
                Authorization: `Bearer ${getToken()}`
            },

            body: formData

        });

        if (!response.ok) {

            throw new Error("Import Failed");

        }

        showToast("Notes Imported Successfully");

        // loadNotes();

        importFile.value = "";

        await loadNotes();

    } catch (error) {

        showToast(error.message);

    }

}



function renderNotes(notes){

    notesContainer.innerHTML="";

    if(notes.length===0){

        notesContainer.innerHTML=`
            <p>No Notes Found</p>
        `;

        return;

    }

    notes.forEach(item => {

    const note = item.note || item;

    const card = document.createElement("div");
    card.className = "note-card";

    const title = document.createElement("h3");
    title.textContent = note.title;

    const content = document.createElement("p");
    content.textContent = note.content;

    const tag = document.createElement("small");
    tag.textContent = note.tag;

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    editBtn.addEventListener("click", () => {
    editNote(note.id);
});

deleteBtn.addEventListener("click", () => {
    deleteNote(note.id);
});

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(title);
    card.appendChild(content);
    card.appendChild(tag);
    card.appendChild(actions);

    notesContainer.appendChild(card);

});

}




/* ===============================
        CREATE NOTE
================================ */

noteForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const title=document.getElementById("title").value;

    const content=document.getElementById("content").value;

    const tag=document.getElementById("tag").value;



    if(editingNoteId){

    await updateNote(
        editingNoteId,
        title,
        content,
        tag
    );

    editingNoteId = null;

    submitBtn.innerText = "Create Note";

    noteForm.reset();

    loadNotes();

    return;

}


    try{

        const response=await fetch(`${BASE_URL}/notes`,{

            method:"POST",

            headers:authHeaders(),

            body:JSON.stringify({

                title,
                content,
                tag

            })

        });


        if(!response.ok){

            throw new Error("Unable to create note");

        }

        const data=await response.json();

        console.log(data);

        showToast("Note Created Successfully");

        loadNotes();

        noteForm.reset();

    }

    catch(error){

        showToast(error.message);

    }

});




async function editNote(id){

    try{

        const response = await fetch(
            `${BASE_URL}/notes`,
            {
                headers: authHeaders()
            }
        );

        const notes = await response.json();

        const note = notes.find(n => n.id === id);

        if(!note){
            return;
        }

        document.getElementById("title").value = note.title;

        document.getElementById("content").value = note.content;

        document.getElementById("tag").value = note.tag;

        editingNoteId = id;

        submitBtn.innerText = "Update Note";

        cancelEditBtn.classList.remove("hidden");

    }

    catch(error){

        showToast(error.message);

    }

}


async function updateNote(id, title, content, tag) {

    const response = await fetch(`${BASE_URL}/notes/${id}`, {

        method: "PUT",

        headers: authHeaders(),

        body: JSON.stringify({
            title,
            content,
            tag
        })

    });

    if (!response.ok) {

        throw new Error("Update Failed");

    }

    showToast("Note Updated Successfully");

    noteForm.reset();

    editingNoteId = null;

    submitBtn.innerText = "Create Note";

    cancelEditBtn.classList.add("hidden");

    loadNotes();

}



async function deleteNote(id){

    deleteNoteId = id;

    deleteModal.style.display = "flex";

}

cancelDelete.addEventListener("click", () => {

    deleteModal.style.display = "none";

    deleteNoteId = null;

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        deleteModal.style.display = "none";

        deleteNoteId = null;

    }

});


confirmDelete.addEventListener("click", async () => {

    deleteModal.style.display = "none";

    await deleteNoteConfirmed(deleteNoteId);

});


deleteModal.addEventListener("click", (e) => {

    if (e.target === deleteModal) {

        deleteModal.style.display = "none";

        deleteNoteId = null;

    }

});


async function deleteNoteConfirmed(id){

    if(!id){
        return;
    }

    try{

        const response = await fetch(`${BASE_URL}/notes/${id}`,{

            method:"DELETE",

            headers: authHeaders()

        });

        if(!response.ok){

            throw new Error("Delete Failed");

        }

        showToast("Note Deleted Successfully");

        deleteNoteId = null;

        await loadNotes();

    }

    catch(error){

        showToast(error.message);

    }

}




// async function deleteNote(id){

//     const ok = confirm("Delete this note?");

//     if(!ok){
//         return;
//     }

//     try{

//         const response = await fetch(`${BASE_URL}/notes/${id}`,{

//             method:"DELETE",

//             headers:authHeaders()

//         });

//         if(!response.ok){

//             throw new Error("Delete Failed");

//         }

//         showToast("Note Deleted");

//         loadNotes();

//     }

//     catch(error){

//         showToast(error.message);

//     }

// }



function showToast(message){

    const toast=document.getElementById("toast");

    toast.innerText=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}



cancelEditBtn.addEventListener("click", () => {

    noteForm.reset();

    editingNoteId = null;

    submitBtn.innerText = "Create Note";

    cancelEditBtn.classList.add("hidden");

});