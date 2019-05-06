const bcrypt = require('bcryptjs');
const db = require('./models');

const cityData = [
  {
    name: 'London',
    country: 'United Kingdom',
    imageUrl: ''
  },
  {
    name: 'Sydney',
    country: 'Australia',
    imageUrl: ''
  },
  {
    name: 'San Francisco',
    country: 'United States',
    imageUrl: ''
  },
  {
    name: 'Seattle',
    country: 'United States',
    imageUrl: ''
  },
];

const usersData = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    password: '1234',
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    city: 'San Diego'
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    password: '1234',
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    city: 'Sacramento'
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    password: '1234',
    phone: "1-463-123-4447",
    website: "ramiro.info",
    city: 'Fairfield'
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    password: '1234',
    phone: "493-170-9623 x156",
    website: "kale.biz",
    city: 'Cypress'
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    password: '1234',
    phone: "(254)954-1289",
    website: "demarco.info",
    city: 'Fountain Valley'
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    password: '1234',
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    city: 'Big Sur'
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    password: '1234',
    phone: "210.067.6132",
    website: "elvis.io",
    city: 'Monterey'
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    password: '1234',
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
    city: 'Pacific Grove'
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    password: '1234',
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    city: 'Carmel'
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    password: '1234',
    phone: "024-648-3804",
    website: "ambrose.net",
    city: 'Sand City'
  }
];

const postsData = [
  {
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
  },
  {
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit"
  },
  {
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque"
  },
  {
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid molestiae perspiciatis et ea nemo ab reprehenderit accusantium quas voluptate dolores velit et doloremque molestiae"
  },
  {
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae magni quis enim qui quis quo nemo aut saepe quidem repellat excepturi ut quia sunt ut sequi eos ea sed quas"
  },
  {
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum facilis quibusdam animi sint suscipit qui sint possimus cum quaerat magni maiores excepturi ipsam ut commodi dolor voluptatum modi aut vitae"
  },
  {
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore enim quia ad veniam autem ut quam aut nobis et est aut quod aut provident voluptas autem voluptas"
  },
  {
    title: "optio molestias id quia eum",
    body: "quo et expedita modi cum officia vel magni doloribus qui repudiandae vero nisi sit quos veniam quod sed accusamus veritatis error"
  },
  {
    title: "et ea vero quia laudantium autem",
    body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus accusamus in eum beatae sit vel qui neque voluptates ut commodi qui incidunt ut animi commodi"
  },
  {
    title: "in quibusdam tempore odit est dolorem",
    body: "itaque id aut magnam praesentium quia et ea odit et ea voluptas et sapiente quia nihil amet occaecati quia id voluptatem incidunt ea est distinctio odio"
  },
  {
    title: "dolorum ut in voluptas mollitia et saepe quo animi",
    body: "aut dicta possimus sint mollitia voluptas commodi quo doloremque iste corrupti reiciendis voluptatem eius rerum sit cumque quod eligendi laborum minima perferendis recusandae assumenda consectetur porro architecto ipsum ipsam"
  },
  {
    title: "voluptatem eligendi optio",
    body: "fuga et accusamus dolorum perferendis illo voluptas non doloremque neque facere ad qui dolorum molestiae beatae sed aut voluptas totam sit illum"
  },
  {
    title: "eveniet quod temporibus",
    body: "reprehenderit quos placeat velit minima officia dolores impedit repudiandae molestiae nam voluptas recusandae quis delectus officiis harum fugiat vitae"
  },
  {
    title: "sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio",
    body: "suscipit nam nisi quo aperiam aut asperiores eos fugit maiores voluptatibus quia voluptatem quis ullam qui in alias quia est consequatur magni mollitia accusamus ea nisi voluptate dicta"
  },
  {
    title: "fugit voluptas sed molestias voluptatem provident",
    body: "eos voluptas et aut odit natus earum aspernatur fuga molestiae ullam deserunt ratione qui eos qui nihil ratione nemo velit ut aut id quo"
  },
  {
    title: "voluptate et itaque vero tempora molestiae",
    body: "eveniet quo quis laborum totam consequatur non dolor ut et est repudiandae est voluptatem vel debitis et magnam"
  },
  {
    title: "adipisci placeat illum aut reiciendis qui",
    body: "illum quis cupiditate provident sit magnam ea sed aut omnis veniam maiores ullam consequatur atque adipisci quo iste expedita sit quos voluptas"
  },
  {
    title: "doloribus ad provident suscipit at",
    body: "qui consequuntur ducimus possimus quisquam amet similique suscipit porro ipsam amet eos veritatis officiis exercitationem vel fugit aut necessitatibus totam omnis rerum consequatur expedita quidem cumque explicabo"
  }
]

const seedDatabase = async () => {
  try {
    // Remove All Users
    const deletedUsers = await db.User.deleteMany();
    console.log(`Deleted ${deletedUsers.deletedCount} users...`);

    // Remove All Cities
    const deletedCities = await db.City.deleteMany();
    console.log(`Deleted ${deletedCities.deletedCount} cities...`);

    // Remove All Posts
    const deletedPosts = await db.Post.deleteMany();
    console.log(`Deleted ${deletedPosts.deletedCount} posts...`);

    // Create New Users
    console.log('Hashing user passwords...');
    for (const user in usersData) {
      const hashedPassword = await bcrypt.hashSync(usersData[user].password, bcrypt.genSaltSync(10));
      usersData[user].password = hashedPassword;
    }
    console.log('Password hashing success...!')
    const newUsers = await db.User.create(usersData);
    console.log(`Created ${newUsers.length} new users...`);

    // Create New Cities
    const newCities = await db.City.create(cityData);
    console.log(`Created ${newCities.length} new cities...`);

    // Create New Posts
    const newPosts = await db.Post.create(postsData);
    console.log(`Created ${newPosts.length} new posts...`);

    // Associate Users/Posts/Cities
    for (const post in newPosts) {
      const randomIndex = arr => Math.floor(Math.random() * arr.length);
      newPosts[post].userId = newUsers[randomIndex(newUsers)];
      newPosts[post].cityId = newCities[randomIndex(newCities)];
      const savedPost = await newPosts[post].save();
    }

    // Association Success
    console.log('Users, Cities and Posts associated successfully...');

    // Exit
    console.log('Exiting...');
    process.exit();
  } catch (err) {
    if (err) console.log(err);
  }
}

seedDatabase();
