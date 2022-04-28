import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG",
//     address: "Some address 5, 12345 Munich",
//     desc: "This is a first Meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/da/Allianz_arena_golden_hour_Richard_Bartz.jpg",
//     address: "Some address 10, 54321 Frankfurt",
//     desc: "This is a second Meetup!",
//   },
// ];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// };

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://himoura:Bargle33@cluster0.z9d0q.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
