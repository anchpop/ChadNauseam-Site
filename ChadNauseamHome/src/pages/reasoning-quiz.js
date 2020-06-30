import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const questions = [
  [ // Questions 1 and 11. Principle: Should you get rid of protests you don't like through legal technicalities?
    {
      question: "Neo-Nazis are holding a demonstration in a small town, waving swastikas around and shouting about Hitler. They seem to be pretty peaceful so far, so the First Amendment says you probably can’t get rid of them. However, their demonstration seems to be near a main street and it could be a minor inconvenience to the traffic trying to go through.",
      con: "Allow the neo-Nazis to demonstrate unmolested",
      prog: "Break up the demonstration on the grounds of ‘blocking traffic’",

    }, {
      question: "A human rights group is picketing the headquarters of Exxon Mobil for abusing their workers in Third World countries. Exxon Mobil executives feel very uncomfortable entering their HQ and say that the protesters are blocking the main entrance to the building. They want the protesters to go protest in a designated free speech zone a few miles away where it will have no effect on them.",
      con: "Tell them to go protest far away",
      prog: "Allow the human rights group to continue to stay near the building",
    }
  ], [ // Questions 2 and 12. Principle: Should you get fire people for political views expressed off-the-job?
    {
      question: "The anchor of a major news network donates lots of money to organizations fighting against gay marriage, and in his spare time he writes editorials arguing that homosexuals are weakening the moral fabric of the country. The news network decides they disagree with this kind of behavior and fire the anchor.",
      con: "This is outrageous; people should be judged on the quality of their work and not their political beliefs",
      prog: "This is acceptable; the news network is acting within their rights and according to their principles",
    },
    {
      question: "The principal of a private school is a member of Planned Parenthood and, off-duty, speaks out about contraception and the morning after pill. The board of the private school decides this is inappropriate given the school’s commitment to abstinence and moral education and asks the principal to stop these speaking engagements or step down from his position.",
      con: "The school board is acting within its rights; they can insist on a principal who shares their values",
      prog: "The school board should back off; it’s none of their business what he does in his free time",
    },
  ], [ // Questions 3 and 13. Principle: Should the supreme court use broad interpretations of the constitution to require states keep certain things legal?
    {
      question: "A conservative Southern state makes a very strict law restricting the cases in which a woman can get an abortion. The United States Supreme Court, which happens to be dominated by liberal justices, takes an activist stance and strikes down the law based on a conflict with a very broad interpretation of the Constitution.",
      con: "This is unfortunate; when something is not clearly prohibited, the Supreme Court should err in favor of states rights",
      prog: "This is acceptable; the Supreme Court should be zealous in its duty of defending constitutional rights against potentially extremist states",
    },
    {
      question: "New York City passes one of the most restrictive gun control laws in the nation. The conservative-dominated federal Supreme Court strikes it down, taking a broad construction of the Second Amendment as prohibiting such regulations.",
      con: "Agree with the Court’s decision; the Court has a duty to protect freedom against state infringement",
      prog: "Disagree; the Court should respect New York City’s right to legislate toward its own problems",
    },
  ], [ // Questions 4 and 14. Principle: Should local governments allow public commemorations when a minority of their populace disagrees with them?
    {
      question: "The Dalai Lama comes to speak at a college town, and the town wants to hold a big celebration honoring his visit, give him the key to the city, and make a small monument commemorating the event. The town’s sizeable Chinese minority population gets upset, saying they strongly believe the Dalai Lama is a bad person trying to break apart China.",
      con: "The town should celebrate the Dalai Lama’s visit however they feel appropriate; it’s pretty cool and the Chinese are outvoted",
      prog: "The town should consider the sensibilities of the Chinese minority and keep the Dalai Lama’s visit low-key and unofficial",
    },
    {
      question: "The United Nations is trying to pass a resolution banning land mines and allocating some resources to clean up existing mines that pose a danger to civilians. North Korea is causing a fuss and refusing to support the resolution, and this is endangering its chances of passing. The proponents of the resolution come up with a scheme to exploit a loophole in UN procedures, holding the vote in secret at a time when the North Korean representative might not even be present.",
      con: "The town should build the monument, as desired by the majority of its citizens",
      prog: "The town should avoid building the monument to respect the wishes of its minority community",
    }
  ], [ // Questions 5 and 15. Principle: Should you use loopholes and tricks in the political process to pass or restrict legislation if you can't get your way honestly?
    {
      question: "The United Nations is trying to pass a resolution banning land mines and allocating some resources to clean up existing mines that pose a danger to civilians. North Korea is causing a fuss and refusing to support the resolution, and this is endangering its chances of passing. The proponents of the resolution come up with a scheme to exploit a loophole in UN procedures, holding the vote in secret at a time when the North Korean representative might not even be present.",
      con: "Stick to normal procedure and try to pass the anti-mine resolution above board and through legitimate channels",
      prog: "Exploit this loophole to make sure the anti-mine resolution passes",
    },
    {
      question: "The Democrats are in the process of passing a new law that cuts corporate welfare to large oil companies. A small group of Republicans oppose this measure but seem to be outnumbered. One delegate realizes that if he filibusters for the next twenty-six hours, he can delay the bill long enough that it will fall off the schedule of this session of Congress and potentially be voted upon by a friendlier legislature next term.",
      con: "The Republican legislator is fairly following procedure and therefore his filibuster is acceptable or even commendable",
      prog: "The Republican legislator is contradicting the obvious will of the chamber and is kind of an asshole",
    }
  ], [ // Questions 6 and 16. Principle: Should groups attempt to control other's speech through deliberate public shaming?
    {
      question: "A feminist group is annoyed at Disney for making too many movies where a dashing male hero saves a helpless princess. They publicly demand Disney stop making this kind of movie and instead make movies with strong female heroes. They will have prominent marches accusing everyone in Disney of sexism until they comply.",
      con: "This feminist group is being obnoxious and bullying, and deserve condemnation",
      prog: "This feminist group is acting according to proper democratic means to change a problematic feature of the culture, and deserve praise",
    },
    {
      question: "Sometime in the 1950s, The Society Of Patriotic Americans For A More Patriotic America notices that a lot of writers seem to lean left, and worries that novels are promoting Communist ideas (perhaps by portraying businessmen in a very negative light or having rebels and political agititators as heroes). They meet with the heads of various publishing companies and ask the companies to self-monitor their books to make sure they are suitably American. SOPAFAMPA threatens to tar them in the press as Commies if they refuse.",
      con: "SOPAFAMPA did not threaten force and therefore did not violate the First Amendment. They are doing their patriotic duty as citizens to try to fight Communism wherever they finds it.",
      prog: "SOPAFAMPA’s comments, even if not direct threats, will have a chilling effect on artistic expression and are tantamount to censorship.",
    }
  ],

  // ideas for further tests:
  // cancellation of historical figures
  // being proud of your country vs. being proud of your race

  // This whole thing is a bit of a trap for non meta-level thinkers, because the answers to the some of the questions include meta-level principles in them (which you wouldn't believe in as an object-level thinker). 
]


/*

    {
      question: "",
      con: "",
      prog: "",
    },
    {
      question: "",
      con: "",
      prog: "",
    }
*/

const SecondPage = () => (
  <Layout subtitle="Political Reasoning Style Quiz">
    <SEO title="Page two" />
  </Layout>
)

export default SecondPage
