'use client';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HackathonPage() {
  const [hackathons, setHackathon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3001/api/v1/hackathons');
        const hackathonsData = res.data.data.map((hack) => {
          let status = '';
          const current = new Date();
          const startDate = new Date(hack.start_date);
          const endDate = new Date(hack.end_date);
          if (current < startDate) {
            status = 'Upcoming';
          } else if (current > endDate) {
            status = 'Finished';
          } else {
            status = 'Ongoing';
          }
          return { ...hack, status };
        });
        setHackathon(hackathonsData);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
        setHackathon([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  console.log('Hackathons:', hackathons, 'Loading:', loading);
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 flex flex-col">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 mt-10"
        >
          <h2 className="text-3xl lg:text-5xl mt-20 mb-10 tracking-tighter bg-gradient-to-t  from-neutral-00 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
            Hackathon Events
          </h2>
        </motion.div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <h3 className="text-xl text-neutral-300">Loading hackathons...</h3>
          </div>
        ) : hackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {hackathons.map((hackathon, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neutral-500/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col gap-3 relative"
                  key={hackathon.id}
                >
                  <div className="absolute top-0 right-0 mt-10 mr-10">
                    <Badge
                      variant="outline"
                      className="text-sm text-neutral-300 border border-green-400"
                    >
                      {hackathon.status}
                    </Badge>
                  </div>
                  <div className="">
                    <img
                      src={hackathon.cover_image}
                      alt={hackathon.name}
                      className="rounded-lg w-full h-52 object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center ">
                    <h3 className="text-xl text-neutral-300 font-semibold mb-4">
                      {hackathon.name}
                    </h3>
                    <div className="flex flex-row items-center mb-4">
                      <p className="text-neutral-400  text-[14px]">
                        Participant
                      </p>
                      <Badge
                        variant="outline"
                        className="ml-2 text-sm text-neutral-300 border border-green-400"
                      >
                        {hackathon.participantCount}
                      </Badge>
                    </div>
                    {hackathon.prize_pool ? (
                      <div className="flex flex-row items-center mb-4 gap-5">
                        <p className="text-neutral-400  text-[14px]">Prize</p>
                        <Badge
                          variant="outline"
                          className="text-sm text-neutral-300 border border-green-400"
                        >
                          {hackathon.prize_pool} MMK
                        </Badge>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="flex flex-row items-center mb-4">
                      <p className="text-neutral-400  text-[14px]">Points</p>
                      <Badge
                        variant="outline"
                        className="ml-2 text-sm text-neutral-300 border border-green-400"
                      >
                        {hackathon.register_point}
                      </Badge>
                    </div>
                    <Link
                      href={`/hackathon/${hackathon.id}`}
                      className="mt-5 text-neutral-300 text-sm font-semibold bg-neutral-500/20 hover:bg-neutral-400 px-4 py-2 rounded-md text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              );
            })}
            {/*  */}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <h3 className="text-xl text-neutral-300">No Hackathon Available</h3>
          </div>
        )}
      </div>
    </section>
  );
}
