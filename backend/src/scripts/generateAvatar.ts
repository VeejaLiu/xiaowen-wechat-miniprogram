import { User } from '../models';
import { generateAvatarByUserID } from '../general/user/login';

async function main() {
    console.log('Start');

    // get all users
    const users = await User.findAll({
        attributes: ['id'],
    });
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(`${user.id} start`);
        await generateAvatarByUserID(user.id);
        console.log(`${user.id} done`);
    }
}

main().then(() => {
    console.log('Finished!');
    process.exit();
});
