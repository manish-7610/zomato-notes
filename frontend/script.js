let debounceTimer;


/* =====================================
        ZOMATO NOTES FRONTEND
===================================== */

const BASE_URL = "http://127.0.0.1:8000";

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

const profileBtn=document.getElementById("profileBtn");

let editingNoteId = null;

const submitBtn = noteForm.querySelector("button");

const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let deleteNoteId = null;

const cancelEditBtn = document.getElementById("cancelEditBtn");

const profileModal = document.getElementById("profileModal");

const closeProfileBtn = document.getElementById("closeProfileBtn");

const profileName = document.getElementById("profileName");

const profileEmail = document.getElementById("profileEmail");

const profileNotes = document.getElementById("profileNotes");

const profileJoined = document.getElementById("profileJoined");

const editProfileBtn = document.getElementById("editProfileBtn");

const editProfileModal = document.getElementById("editProfileModal");

const editProfileForm = document.getElementById("editProfileForm");

const editName = document.getElementById("editName");

const editEmail = document.getElementById("editEmail");

const cancelEditProfile = document.getElementById("cancelEditProfile");

function showLoader(){

    loading.classList.remove("hidden");

}

function hideLoader(){

    loading.classList.add("hidden");

}


/* =====================================
        INIT
===================================== */

window.addEventListener("DOMContentLoaded", async ()=>{

    tag.addEventListener("change",()=>{

    if(tag.value==="Others"){

        customCategory.classList.remove("hidden");

        customCategory.required=true;

    }

    else{

        customCategory.classList.add("hidden");

        customCategory.required=false;

        customCategory.value="";

    }

});


if(getToken()){

    loginBtn.style.display="none";
    logoutBtn.style.display="inline-block";
    profileBtn.style.display="inline-block";

    await loadNotes();

}else{

    loginBtn.style.display="inline-block";
    logoutBtn.style.display="none";
    profileBtn.style.display="none";

}

});





// ===============================
// Dynamic Category System
// ===============================

let allNotes = [];
let activeCategory = "All Tags";

// ===============================
// Pagination State
// ===============================

let currentPage = 1;
const NOTES_PER_PAGE = 10;
let currentDisplayNotes = [];

async function loadCategoryTree() {

    const categoryTree = document.getElementById("categoryTree");

    if (!categoryTree) return;

    // Unique Categories
    const tags = [...new Set(
        allNotes
            .map(note => note.tag)
            .filter(tag => tag && tag.trim() !== "")
    )].sort();

    categoryTree.innerHTML = "";

    const ul = document.createElement("ul");

    ul.className = "category-list";

    // ================= All Tags =================

    const allItem = document.createElement("li");

    allItem.textContent = `All Tags (${allNotes.length})`;

    allItem.className =
        activeCategory === "All Tags"
            ? "active-category"
            : "";

    allItem.onclick = () => {

        activeCategory = "All Tags";

        currentPage = 1;

        renderNotes(allNotes);

        loadCategoryTree();

    };

    ul.appendChild(allItem);

    // ================= Categories =================

    tags.forEach(tag => {

        const count = allNotes.filter(
            note => note.tag === tag
        ).length;

        const li = document.createElement("li");

        li.textContent = `${tag} (${count})`;

        li.className =
            activeCategory === tag
                ? "active-category"
                : "";

        li.onclick = () => {

            activeCategory = tag;

            currentPage = 1;

            const filtered = allNotes.filter(
                note => note.tag === tag
            );

            renderNotes(filtered);

            loadCategoryTree();

        };

        ul.appendChild(li);

    });

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

        await login(email, password);
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

        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("created_at", data.created_at || "");

        authModal.style.display="none";

        // Clear auth form fields so they are clean on next open
        emailInput.value = "";
        passwordInput.value = "";
        nameInput.value = "";

loginBtn.style.display = "none";

logoutBtn.style.display = "inline-block";

profileBtn.style.display = "inline-block";

await loadNotes();

showToast("Login Successful");

    }

    catch(error){

        showToast(error.message);

    }

}



/* ===============================
        LOGOUT
================================ */

logoutBtn.addEventListener("click", () => {

    removeToken();

    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("created_at");

    profileModal.style.display = "none";

    editProfileModal.style.display = "none";

    authModal.style.display = "none";

    logoutBtn.style.display = "none";

    profileBtn.style.display = "none";

    loginBtn.style.display = "inline-block";

    notesContainer.innerHTML = "";

    allNotes = [];

    activeCategory = "All Tags";

    currentPage = 1;

    currentDisplayNotes = [];

    loadCategoryTree();

    const paginationEl = document.getElementById("pagination");
    if (paginationEl) paginationEl.innerHTML = "";

    showToast("Logged Out");

});

profileBtn.addEventListener("click", async () => {

    try {

        profileName.textContent =
            localStorage.getItem("name") || "User";

        profileEmail.textContent =
            localStorage.getItem("email") || "Unknown";

        profileNotes.textContent =
            allNotes.length;

        editProfileModal.style.display = "none";

        profileModal.style.display = "flex";

    }

    catch(error){

        console.error(error);

    }

});

closeProfileBtn.addEventListener("click", () => {

    profileModal.style.display = "none";

});


editProfileBtn.addEventListener("click", () => {

    editName.value = localStorage.getItem("name");

    editEmail.value = localStorage.getItem("email");


    profileModal.style.display = "none";

    editProfileModal.style.display = "flex";

});

cancelEditProfile.addEventListener("click", () => {

    editProfileModal.style.display = "none";

    profileModal.style.display = "flex";

});


editProfileForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    // Capture the email before the update to detect if it changed
    const previousEmail = localStorage.getItem("email");

    try{

        const response = await fetch(`${BASE_URL}/profile`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json",
                ...authHeaders()
            },

            body:JSON.stringify({

                name:editName.value,

                email:editEmail.value

            })

        });

        if(!response.ok){

            throw new Error("Unable to update profile");

        }

        const user = await response.json();

        localStorage.setItem("name", user.name);

        localStorage.setItem("email", user.email);

        profileName.textContent = user.name;

        profileEmail.textContent = user.email;

        editProfileModal.style.display = "none";

        // If the email changed, the existing JWT is now invalid (it stores
        // the old email as the "sub" claim). Force the user to log in again.
        if (user.email !== previousEmail) {

            removeToken();

            localStorage.removeItem("name");

            localStorage.removeItem("email");

            localStorage.removeItem("created_at");

            allNotes = [];

            activeCategory = "All Tags";

            currentPage = 1;

            currentDisplayNotes = [];

            notesContainer.innerHTML = "";

            loadCategoryTree();

            const paginationEl = document.getElementById("pagination");
            if (paginationEl) paginationEl.innerHTML = "";

            logoutBtn.style.display = "none";

            profileBtn.style.display = "none";

            loginBtn.style.display = "inline-block";

            showToast("Email changed. Please log in again.");

        } else {

            await loadNotes();

            profileModal.style.display = "flex";

            showToast("Profile Updated");

        }

    }

    catch(error){

        showToast(error.message);

    }

});



window.addEventListener("click", (e) => {

    if (e.target === profileModal) {

        profileModal.style.display = "none";

    }

});


window.addEventListener("click",(e)=>{

    if(e.target===editProfileModal){

        editProfileModal.style.display="none";

        profileModal.style.display="flex";

        

    }

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

    error.textContent = "";

    try{

        const response = await fetch(`${BASE_URL}/notes`,{
            headers: authHeaders()
        });

        if(!response.ok){
            throw new Error("Unable to load notes");
        }

        const notes = await response.json();

        allNotes = notes;

        profileNotes.textContent = notes.length;

profileEmail.textContent = localStorage.getItem("email") || "Unknown";

profileName.textContent = localStorage.getItem("name") || "User";

const rawDate = localStorage.getItem("created_at");
if (rawDate) {
    const d = new Date(rawDate);
    profileJoined.textContent = d.toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric"
    });
} else {
    profileJoined.textContent = "—";
}

        currentPage = 1;

        loadCategoryTree();

        renderNotes(notes);

    }

    catch(err){

        error.textContent = "Failed to load notes. Please check your connection and try again.";

    }

    finally{

    hideLoader();

}

}



function searchNotes(){

    const keyword = searchInput.value.trim().toLowerCase();

    if(keyword === ""){

        currentPage = 1;

        renderNotes(allNotes);

        return;

    }

    const filtered = allNotes.filter(note =>
        note.title.toLowerCase().includes(keyword) ||
        note.content.toLowerCase().includes(keyword) ||
        note.tag.toLowerCase().includes(keyword)
    );

    currentPage = 1;

    renderNotes(filtered);

}
searchInput.addEventListener("input", () => {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        searchNotes();

    }, 400);

});

let smartDebounceTimer;

smartSearchInput.addEventListener("input", () => {

    clearTimeout(smartDebounceTimer);

    smartDebounceTimer = setTimeout(() => {

        smartSearch();

    }, 400);

});

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

currentPage = 1;

renderNotes(data.results);

    }

    catch(error){

        showToast(error.message);

    }

}

async function importNotes(e) {

    if (e) e.preventDefault();
    
    const file = importFile.files[0];

    if (!file) {
        showToast("Please select a TXT file");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

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

        importFile.value = "";

        await loadNotes();

    } catch (error) {

        showToast(error.message);

    }

}



function renderNotes(notes){

    // Store the full current display set for pagination
    currentDisplayNotes = notes;

    notesContainer.innerHTML="";

    if(notes.length===0){

        notesContainer.innerHTML=`
            <p>No Notes Found</p>
        `;

        renderPagination(0);

        return;

    }

    // Slice the notes for the current page
    const start = (currentPage - 1) * NOTES_PER_PAGE;
    const end = start + NOTES_PER_PAGE;
    const pageNotes = notes.slice(start, end);

    pageNotes.forEach(item => {

    const note = item.note || item;

    const card = document.createElement("div");
    card.className = "note-card";
    card.dataset.id = note.id;

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

    renderPagination(notes.length);

}


/* ===============================
        PAGINATION
================================ */

function renderPagination(totalNotes) {

    const paginationEl = document.getElementById("pagination");

    if (!paginationEl) return;

    paginationEl.innerHTML = "";

    const totalPages = Math.ceil(totalNotes / NOTES_PER_PAGE);

    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "← Prev";
    prevBtn.className = "page-btn" + (currentPage === 1 ? " page-btn-disabled" : "");
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderNotes(currentDisplayNotes);
        }
    });
    paginationEl.appendChild(prevBtn);

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        pageBtn.className = "page-btn" + (i === currentPage ? " page-btn-active" : "");
        pageBtn.addEventListener("click", () => {
            currentPage = i;
            renderNotes(currentDisplayNotes);
        });
        paginationEl.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next →";
    nextBtn.className = "page-btn" + (currentPage === totalPages ? " page-btn-disabled" : "");
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderNotes(currentDisplayNotes);
        }
    });
    paginationEl.appendChild(nextBtn);

}


/* ===============================
        CREATE NOTE
================================ */

noteForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;

    const content = document.getElementById("content").value;

    const tag = document.getElementById("tag").value;

    const customCategoryInput =
        document.getElementById("customCategory");

    const customCategory =
        customCategoryInput.value.trim();

    const finalTag =
        tag === "Others"
            ? customCategory
            : tag;

    // ================= EDIT =================

    if (editingNoteId) {

        await updateNote(
            editingNoteId,
            title,
            content,
            finalTag
        );

        editingNoteId = null;

        submitBtn.innerText = "Create Note";

        noteForm.reset();

        customCategoryInput.classList.add("hidden");
        customCategoryInput.value = "";

        document.getElementById("tag").value = "";

        loadNotes();

        return;
    }

    // ================= CREATE =================

    try {

        const response = await fetch(`${BASE_URL}/notes`, {

            method: "POST",

            headers: authHeaders(),

            body: JSON.stringify({

                title,
                content,
                tag: finalTag

            })

        });

        if (!response.ok) {

            throw new Error("Unable to create note");

        }

        const data = await response.json();

        showToast("Note Created Successfully");

        noteForm.reset();

        customCategoryInput.classList.add("hidden");
        customCategoryInput.value = "";

        document.getElementById("tag").value = "";

        await loadNotes();

        // Assignment requirement: render AI suggestion on the new note card
        // with an "Apply as tag" button that calls PUT /notes/{id}
        if (data.ai_suggestion && data.note) {

            const newNoteId = data.note.id;

            // Ensure the new note's page is visible before querying the DOM.
            // After loadNotes() resets currentPage to 1, the new note may be
            // on a later page if the user has more than 10 notes.
            const noteIndex = allNotes.findIndex(n => n.id === newNoteId);
            if (noteIndex !== -1) {
                const targetPage = Math.ceil((noteIndex + 1) / NOTES_PER_PAGE);
                if (targetPage !== currentPage) {
                    currentPage = targetPage;
                    renderNotes(allNotes);
                }
            }

            const targetCard = notesContainer.querySelector(`[data-id="${newNoteId}"]`);

            if (targetCard) {

                const aiBox = document.createElement("div");
                aiBox.className = "ai-box";

                const aiTitle = document.createElement("h4");
                aiTitle.textContent = "🤖 AI Suggests";

                const aiSummary = document.createElement("p");
                aiSummary.textContent = "Summary: " + data.ai_suggestion.summary;

                const aiTags = document.createElement("p");
                aiTags.textContent = "Tags: " + data.ai_suggestion.tags.join(", ");

                const applyBtn = document.createElement("button");
                applyBtn.textContent = "Apply as tag";
                applyBtn.className = "ai-btn";

                applyBtn.addEventListener("click", async () => {

                    const firstTag = data.ai_suggestion.tags[0];

                    if (!firstTag) return;

                    try {

                        const res = await fetch(`${BASE_URL}/notes/${newNoteId}`, {

                            method: "PUT",

                            headers: authHeaders(),

                            body: JSON.stringify({
                                title: data.note.title,
                                content: data.note.content,
                                tag: firstTag
                            })

                        });

                        if (!res.ok) throw new Error("Apply tag failed");

                        showToast("Tag applied: " + firstTag);

                        aiBox.remove();

                        await loadNotes();

                    } catch (err) {

                        showToast(err.message);

                    }

                });

                aiBox.appendChild(aiTitle);
                aiBox.appendChild(aiSummary);
                aiBox.appendChild(aiTags);
                aiBox.appendChild(applyBtn);

                targetCard.appendChild(aiBox);

            }

        }

    }

    catch (error) {

        showToast(error.message);

    }

});




function editNote(id){

    try{

        const note = allNotes.find(n => n.id === id);

        if(!note){
            return;
        }

        document.getElementById("title").value = note.title;

        document.getElementById("content").value = note.content;

        const tagSelect = document.getElementById("tag");
        tagSelect.value = note.tag;

        // If the tag doesn't match any dropdown option, fall back to "Others"
        // and show the custom category input with the original tag value
        if (tagSelect.value !== note.tag) {
            tagSelect.value = "Others";
            customCategory.classList.remove("hidden");
            customCategory.value = note.tag;
        } else {
            customCategory.classList.add("hidden");
            customCategory.value = "";
        }

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

}



function deleteNote(id){

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