export type NodeMoreInfo = {
  type: "link" | "image";
  label: string;
  url: string;
};

export type NodeData = {
  id: number;
  title: string;
  details: string;
  moreInfo?: NodeMoreInfo;
};

const nodesData: NodeData[] = [
  {
    id: 1,
    title: "Acting",
    details:
      "I was a professional actress. I worked on various TV/movie sets throughout my childhood, working around the world and with various renouned actors/filmmakers.",
    moreInfo: {
      type: "link",
      label: "Check out my IMDb",
      url: "https://www.imdb.com/name/nm3425494/",
    },
  },
  {
    id: 2,
    title: "Violin",
    details:
      "I started playing the violin at 3, and started studying at Juilliard in 5th grade. I played in Carnegie Hall when I was 8, and as a soloist with a professional orchestra at 10.",
    moreInfo: {
      type: "link",
      label: "Watch me play",
      url: "https://www.youtube.com/watch?v=Ga0MeNYi3U0",
    },
  },
  {
    id: 3,
    title: "Cooking",
    details:
      "I absolutely love cooking and baking! I cut out cookies by hand with a knife, and meticulously decorate.",
    moreInfo: {
      type: "image",
      label: "Holiday Cookies",
      url: "/cookies.jpeg",
    },
  },
  {
    id: 4,
    title: "Minecraft",
    details:
      "I got into coding because one of my classmates made a bet that I couldn't code my own Minecraft mod. Wanting to prove him wrong, I realized I really loved coding!",
  },
  {
    id: 5,
    title: "Googling",
    details:
      "I started reading at 2 years old, so I was able to operate a computer very young. I knew how to type before I could hand write!",
    moreInfo: {
      type: "image",
      label: "Baby me googling",
      url: "/baby.jpg",
    },
  },
  {
    id: 6,
    title: "Funny Shirts",
    details:
      "Most people know me by the fact that I am almost always wearing a funny programming t-shirt. Over the years, I have developed quite a collection!",
  },
  {
    id: 7,
    title: "Cats",
    details:
      "I’ve always loved cats! I’m planning to get a kitten soon, and I will leash train it so we can adventure together.",
    moreInfo: {
      type: "image",
      label: "My cat",
      url: "/cat.jpeg",
    },
  },
  {
    id: 8,
    title: "Travel",
    details:
      "I love to travel and make it a goal to visit a new place every year! As someone who’s half Slovenian, I enjoy exploring both familiar roots and new cultures around the world.",
  },
  {
    id: 9,
    title: "Mentorship",
    details:
      "I am a coding tutor who always likes to help others when needed. I love mentoring people earlier in their journey and giving them the help I never had.",
  },
  {
    id: 10,
    title: "Tech Support",
    details:
      "My nickname is Tech Support. I'm always helping people with tech problems or building apps to solve them!",
  },
];

export default nodesData;
