const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mate_travel').then(async () => {
    const db = mongoose.connection.db;
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/men/32.jpg'}, {$set: {'avatar': 'images/avatar1.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/women/44.jpg'}, {$set: {'avatar': 'images/avatar2.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/men/67.jpg'}, {$set: {'avatar': 'images/avatar3.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/women/12.jpg'}, {$set: {'avatar': 'images/avatar2.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/men/22.jpg'}, {$set: {'avatar': 'images/avatar1.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/women/68.jpg'}, {$set: {'avatar': 'images/avatar2.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/men/15.jpg'}, {$set: {'avatar': 'images/avatar3.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/women/33.jpg'}, {$set: {'avatar': 'images/avatar2.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/men/54.jpg'}, {$set: {'avatar': 'images/avatar1.jpg'}});
    await db.collection('usuarios').updateMany({'avatar': 'https://randomuser.me/api/portraits/women/49.jpg'}, {$set: {'avatar': 'images/avatar2.jpg'}});
    process.exit(0);
});
