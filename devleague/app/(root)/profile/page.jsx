'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/app/contexts/AuthContext';

const profile = {
  username: 'dev_master',
  email: 'dev@example.com',
  points: 2450,
  image: '/profile.jpg', // change to real image path
};

const hackathons = {
  ongoing: [
    {
      name: 'AI Showdown 2025',
      startDatetime: 'April 24, 2025 10:00 AM',
      endDatetime: 'April 26, 2025 6:00 PM',
    },
  ],
  upcoming: [
    {
      name: 'Blockchain Bonanza',
      startDatetime: 'May 5, 2025 9:00 AM',
      endDatetime: 'May 5, 2025 5:00 PM',
    },
    {
      name: 'Frontend Fiesta',
      startDatetime: 'May 20, 2025 2:00 PM',
      endDatetime: 'May 20, 2025 6:00 PM',
    },
  ],
  completed: [
    {
      name: 'Code Clash 2024',
      team: 'Team Alpha',
      rank: 1,
      endDate: 'March 20, 2024',
      image: '/codeclash.jpg',
    },
    {
      name: 'HackXperience',
      team: 'Team Beta',
      rank: 2,
      endDate: 'April 10, 2024',
      image: '/hackxperience.jpg',
    },
    {
      name: 'DevSprint',
      team: 'Code Ninjas',
      rank: null,
      endDate: 'February 5, 2024',
      image: '/devsprint.jpg',
    },
  ],
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <section className="max-w-7xl mx-auto px-4 pt-30 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-t from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
          User Profile
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Left Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="md:col-span-2 space-y-6"
        >
          {/* Profile Info */}
          <motion.div variants={itemVariants} custom={0}>
            <Card className="bg-[#7FFFD640] text-neutral-200">
              <CardHeader>
                <CardTitle className="text-2xl">Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-start gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={`${process.env.API}/${user.profile_image}`}
                  />
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-neutral-100">
                  {user.username}
                </h2>
                <p className="text-neutral-400">{user.email}</p>
                <p className="text-neutral-300 font-medium">
                  Points: {user.points}
                </p>
              </CardContent>

              {/* Ongoing Hackathons */}
              <CardHeader>
                <CardTitle className="text-yellow-400">
                  Ongoing Hackathon
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hackathons.ongoing.length > 0 ? (
                  hackathons.ongoing.map((event, i) => (
                    <div
                      key={i}
                      className="flex flex-column justify-between mb-6"
                    >
                      <p className="text-neutral-300 font-semibold">
                        {event.name}
                      </p>
                      <div className="flex flex-col gap-2">
                        <p className="text-neutral-400 text-sm">
                          Start: {event.startDatetime}
                        </p>
                        <p className="text-neutral-400 text-sm">
                          End: {event.endDatetime}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500">No ongoing event</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="md:col-span-3 space-y-6"
        >
          {/* Upcoming Hackathons */}
          <motion.div variants={itemVariants} custom={0}>
            <Card className="bg-neutral-500/10 backdrop-blur-md text-neutral-200">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Upcoming Hackathons
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hackathons.upcoming.length > 0 ? (
                  hackathons.upcoming.map((event, i) => (
                    <div
                      key={i}
                      className="flex flex-column justify-between mb-6"
                    >
                      <p className="text-neutral-300 font-semibold">
                        {event.name}
                      </p>
                      <div className="flex flex-col gap-2">
                        <p className="text-neutral-400 text-sm">
                          Start: {event.startDatetime}
                        </p>
                        <p className="text-neutral-400 text-sm">
                          End: {event.endDatetime}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500">No upcoming events</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Completed Hackathons */}
          <motion.div variants={itemVariants} custom={1}>
            <Card className="bg-neutral-500/10 backdrop-blur-md text-neutral-200">
              <CardHeader>
                <CardTitle className="text-blue-400">
                  My Completed Hackathons
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hackathons.completed.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hackathons.completed.map((event, i) => (
                      <Card
                        key={i}
                        className="bg-neutral-800 border border-neutral-700 text-neutral-200 p-4"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={event.image} />
                            <AvatarFallback>HK</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-neutral-100">
                              {event.name}
                            </p>
                            <p className="text-sm text-neutral-400 italic">
                              {event.team}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-neutral-400 mb-2">
                          Ended on: {event.endDate}
                        </div>
                        <div className="text-sm text-right text-neutral-400">
                          {event.rank === 1
                            ? '🥇 1st Place'
                            : event.rank === 2
                            ? '🥈 2nd Place'
                            : event.rank === 3
                            ? '🥉 3rd Place'
                            : 'No Rank'}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-500">No completed events</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
