
let lastId = 0;

function setup() {
    const projects = [];
    const users = [];
    // Announcements are stored as text bundles
    const announcements = [];

    for (let i = 0; i < 6; i++) {
        randomProject(projects);
    }

    for (let i = 0; i < 3; i++) {
        randomAnnouncement(announcements);
    }

    for (let i = 0; i < 4; i++) {
        randomUser(users);
    }

    populateDashboard(projects, announcements, users);
}

function randomProject(projectArr) {
    const title = randomStr(Math.floor(Math.random() * 14)) + " - " + lastId;;
    let description = "";
    
    for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
        description += randomStr(Math.floor(Math.random() * 14)) + " ";
    }

    projectArr.push(new Project(title, description, false, false));

    return projectArr;
}

function randomAnnouncement(announcementArr) {
    let title = "";
    let description = "";
    
    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
        title += randomStr(Math.floor(Math.random() * 14)) + " ";
    }
    for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
        description += randomStr(Math.floor(Math.random() * 14)) + " ";
    }

    announcementArr.push(new TextBundle(title + " - " + lastId, description));

    return announcementArr;
}

function randomUser(userArr) {
    const title = "@" + randomStr(Math.floor(Math.random() * 10) + 4).slice(1) + " - " + lastId;;
    let description = "";
    
    for (let i = 0; i < (Math.floor(Math.random() * 2) + 2); i++) {
        description += randomStr(Math.floor(Math.random() * 10)) + " ";
    }

    userArr.push(new TrendingUser(title, description));

    return userArr;
}

const randomStr = (length = 8, id) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let str = '';
    str += chars.charAt(Math.floor(Math.random() * chars.length));
    for (let i = 1; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length)).toLowerCase();
    }

    return str;
};

const TextBundle = function(
    title,
    description
) {
    this.title = typeof(title) === "string" ? title : "Unnamed Project";
    this.description = typeof(description) === "string" ? description : "Check it out to find out more!";
}

const Project = function(
    title,
    description,
    isStarred,
    isWatched,
    id
) {
    this.bundle = new TextBundle(title, description);
    this.isStarred = typeof(isStarred) === "boolean" ? isStarred : false;
    this.isWatched = typeof(isWatched) === "boolean" ? isWatched : false;
    this.id = typeof(id) === "number" ? id : newId();
}

const TrendingUser = function(
    tag,
    position,
    pfpUrl,
    id
) {
    this.bundle = new TextBundle(tag, position);
    this.pfpUrl = typeof(pfpUrl) === "string" ? pfpUrl : `./icons/user.png`;
    this.id = typeof(id) === "number" ? id : newId();
}

function generateProject(project) {
    if (typeof(project) !== "object") {
        // To finish
        console.log("ERROR, wrong type in project generator");
        return;
    }

    const projectHTML = `
    <div id="${project.id}" class="card project">
        <div class="project-content">
            <div class="project-text">
                <h3 class="project-title">${project.bundle.title}</h3>
                <p class="project-desc">${project.bundle.description}</p>
            </div>
            <div class="project-utils">
                <button class="btn-icon star ${project.isStarred ? "not-starred" : "starred"}"></button>
                <button class="btn-icon watch ${project.isWatched ? "not-watched" : "watched"}"></button>
                <button class="btn-icon fork"></button>
            </div>
        </div>
    </div>
    `;

    return projectHTML;
}

function generateAnnouncements(anouncements, anouncementsCount) {
    if (typeof(anouncements) !== "object") {
        // To finish
        console.log("ERROR, wrong type in announcements generator");
        return;
    }

    let anouncementsHTML = `
    <div class="card anouncements">
    `;

    for (let i = 0; i < anouncementsCount; i++) {
        const thisAnouncement = anouncements[i];
        const thisAnouncementHTML = `
        <div class="announcement">
            <h5 class="announcement-title">${thisAnouncement.title}</h5>
            <div class="announcement-desc">${thisAnouncement.description}</div>
        </div>
        `
        anouncementsHTML += thisAnouncementHTML;
    }

    anouncementsHTML += `</div>`;

    return anouncementsHTML;
}

function generateUsers(users, usersCount) {
    if (typeof(users) !== "object") {
        // To finish
        console.log("ERROR, wrong type in users generator");
        return;
    }

    let usersHTML = `
    <div class="card users">
    `;

    for (let i = 0; i < usersCount; i++) {
        const thisUser = users[i];
        const thisUserHTML = `
        <div id="${thisUser.id}" class="user-cell">
            <div class="user-pfp" style="background-color: transparent; background-image: url('${thisUser.pfpUrl}');"></div>
            <div class="user-text">
                <div class="user-tag">${thisUser.bundle.title}</div>
                <div class="user-position">${thisUser.bundle.description}</div>
            </div>
        </div>
        `;
        usersHTML += thisUserHTML;
    }

    usersHTML += `</div>`;

    return usersHTML;
}

function newId () {
    return lastId++;
}

function populateDashboard (projectsArr, announcementsArr, usersArr) {
    const projectsCanvas = document.getElementById("projects-canvas");
    const announcementsCanvas = document.getElementById("announcements-wrapper");
    const usersCanvas = document.getElementById("trending-users-wrapper");

    for (let i = 0; i < 6; i++) {
        const project = projectsArr[i];
        projectsCanvas.insertAdjacentHTML("beforeend", generateProject(project));
    }

    announcementsCanvas.insertAdjacentHTML("beforeend",generateAnnouncements(announcementsArr, 3));
    console.log(usersArr);
    usersCanvas.insertAdjacentHTML("beforeend",generateUsers(usersArr, 4));
}

setup();