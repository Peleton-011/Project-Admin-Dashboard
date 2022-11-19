
let lastId = 0;

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
    this.pfpUrl = typeof(pfpUrl) === "string" ? pfpUrl : "./icons/user.png";
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
                <button class="btn-icon star ${project.isStarred ? "starred" : "not-starred"}"></button>
                <button class="btn-icon watch ${project.isWatched ? "watched" : "not-watched"}"></button>
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
            <div class="user-pfp" style="background: transparent url("${thisUser.pfpUrl}") 
            no-repeat fixed center;"></div>
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