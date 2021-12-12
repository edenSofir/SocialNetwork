const g_state = {
    admin : new User("Admin",0,"admin@admin.com","admin",Date.now(),Status.active), //TODO : should it be const some how?
    massages: [],
    users: [],
    posts: []
}