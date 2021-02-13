import toTitleCase from "./toTitleCase";

export type Series = "music/theory";

export const seriesInfo: Record<
  Series,
  {
    seriesTitle: string;
    episodes: {
      title: string;
      description: string;
    }[];
  }
> = {
  "music/theory": {
    seriesTitle: "Music Theory",
    episodes: [
      {
        title: toTitleCase("the explanation that makes it obvious"),
        description:
          "It's important to understand the explanation that makes things obvious.",
      },
      {
        title: toTitleCase("the rules"),
        description:
          "There are good reasons to be skeptical of conventional music notation, and for learning music theory it's of limited use.",
      },
      {
        title: toTitleCase("acoustic consonance"),
        description:
          "Consonance is the most fundamental part of music theory. To understand it, we'll have to learn about sound waves and dive inside the ear",
      },
    ],
  },
};
