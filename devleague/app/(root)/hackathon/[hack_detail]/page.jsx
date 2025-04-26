'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import WinnerCard from '@/components/winner-card';
import { useParams } from 'next/navigation';
import { api, userApi } from '@/lib/axios';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuth } from '@/app/contexts/AuthContext';

export default function HackathonDetail() {
  const [show, setShow] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [team, setTeam] = useState({});
  const [members, setMembers] = useState([]);
  const { hack_detail } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [hackathon, setHackathon] = useState({});
  useEffect(() => {
    isAuthenticated &&
      userApi.get(`/hackathons/${hack_detail}/me`).then((response) => {
        if (response.data && response.data.data) {
          setRegistered(response.data.data.status);
        }
      });
    isAuthenticated &&
      userApi.get(`/teams/${user.team_id}`).then((response) => {
        if (response.data && response.data.data) {
          setTeam(response.data.data);
        }
      });
    api.get(`/hackathons/${hack_detail}`).then((res) => {
      let status = '';
      const current = new Date();
      const startDate = new Date(res.data.data.start_date);
      const endDate = new Date(res.data.data.end_date);
      if (current < startDate) {
        status = 'Upcoming';
      } else if (current > endDate) {
        status = 'Finished';
      } else {
        status = 'Ongoing';
      }
      setHackathon({ ...res.data.data, status });
    });
  }, [hack_detail]);
  const stepVarients = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-[800px] max-w-full px-4">
        {hackathon ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className=" mt-32 mb-10"
          >
            <motion.div
              custom={0}
              variants={stepVarients}
              className=" bg-neutral-500/10 backdrop-blur-md p-6 rounded-xl shadow-lg flex flex-col justify-between relative"
            >
              <div className="absolute top-0 right-0 mt-10 mr-10">
                <Badge
                  variant="outline"
                  className="text-sm text-neutral-300 border border-green-400"
                >
                  {hackathon.status}
                </Badge>
              </div>
              <div className="relative">
                <img
                  src={hackathon.cover_image}
                  alt="cover image"
                  className="rounded-lg w-full h-64 object-cover"
                />
                <div className="absolute -bottom-6 left-3">
                  <img
                    src={hackathon.profile_image}
                    alt="profile image"
                    width={60}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center mt-10 gap-3">
                <h3 className="text-xl text-neutral-300 font-semibold mb-4">
                  {hackathon.name}
                </h3>
                {/* {isAuthenticated && (
                  <Popover>
                    <PopoverTrigger className="bg-green-500/80 hover:bg-green-500 text-neutral-300 rounded-md px-3 py-1">
                      Project Submit
                    </PopoverTrigger>
                    <PopoverContent className="bg-neutral-600/70 flex flex-col border-none gap-5">
                      <form
                        className="gap-3 flex flex-col   text-neutral-300"
                        action=""
                      >
                        <input
                          className="p-2 border border-gray-500 rounded-sm"
                          type="url"
                          name=""
                          placeholder="enter your repo link"
                        />
                        <button
                          type="submit"
                          className=" bg-green-500/80 hover:bg-green-500 text-neutral-300 rounded-md px-3 py-1"
                        >
                          Submit
                        </button>
                      </form>
                    </PopoverContent>
                  </Popover>
                )} */}
                {/*  */}
                {isAuthenticated && (
                  <>
                    {registered ? (
                      <div className="bg-green-500/20 text-green-300 p-3 rounded-md text-center">
                        Registered Successfully
                      </div>
                    ) : (
                      <Popover>
                        <PopoverTrigger className="bg-green-500/80 hover:bg-green-500 text-neutral-300 rounded-md px-3 py-1">
                          Register
                        </PopoverTrigger>
                        <PopoverContent className="bg-neutral-600/70 flex flex-col border-none gap-5">
                          <form
                            className="flex flex-col gap-3"
                            onSubmit={(e) => {
                              e.preventDefault();
                              const selectedMemberIds = members.map(
                                (member) => member.id
                              );
                              console.log(selectedMemberIds);
                              userApi
                                .post(`/hackathons/${hackathon.id}/register`, {
                                  selectedMemberIds: selectedMemberIds,
                                })
                                .then((response) => {
                                  console.log('Registration successful', response);
                                  // You can add success notification here
                                })
                                .catch((error) => {
                                  console.error('Registration failed', error);
                                  // You can add error notification here
                                });
                            }}
                          >
                            {team && team.members ? (
                              team.members.map((member, index) => {
                                return (
                                  <div
                                    key={member.id || index}
                                    className="flex flex-row items-center justify-between text-neutral-300"
                                  >
                                    <div className="flex flex-row gap-3">
                                      <input
                                        type="checkbox"
                                        id={`member-${member.id}`}
                                        value={member.id}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setMembers([...members, member]);
                                          } else {
                                            setMembers(
                                              members.filter(
                                                (m) => m.id !== member.id
                                              )
                                            );
                                          }
                                        }}
                                      />
                                      <img
                                        src={`${process.env.API}/${member.profile_image}`}
                                        alt=""
                                        width={40}
                                      />
                                    </div>
                                    <span>{member.username}</span>
                                    <span>{member.points}</span>
                                  </div>
                                );
                              })
                            ) : (
                              <div className="text-neutral-300">
                                Loading team members...
                              </div>
                            )}
                            <button
                              type="submit"
                              className=" bg-green-500/80 hover:bg-green-500 text-neutral-300 rounded-md px-3 py-1"
                              disabled={
                                members.length < hackathon.min_participants ||
                                members.length > hackathon.max_participants
                              }
                            >
                              Submit
                            </button>
                          </form>
                        </PopoverContent>
                      </Popover>
                    )}
                  </>
                )}

                <div className="flex gap-3">
                  <Users className="text-green-400" />
                  <span className="text-neutral-300">
                    {hackathon.participantCount}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-sm text-neutral-300 border border-green-400"
                >
                  Overview
                </Badge>

                <p className="text-neutral-400 mb-4 text-[14px]">
                  {hackathon.overview}
                </p>
                {hackathon.prize_pool ? (
                  <Badge
                    variant="outline"
                    className="text-sm text-neutral-300 border border-green-400 mb-3"
                  >
                    Prize Pool :{' '}
                    <span className="font-bold">${hackathon.prize_pool}</span>
                  </Badge>
                ) : (
                  ''
                )}

                <div className="flex flex-col gap-3">
                  <Badge
                    variant="outline"
                    className="text-sm text-neutral-300 border border-green-400"
                  >
                    Date & time
                  </Badge>
                  <ul className="flex flex-col items-start mb-4 border-l-2 border-neutral-400 pl-4 gap-3">
                    <li className="">
                      <span className="text-neutral-400 text-[14px]">
                        Webinar Date
                      </span>
                      <span className="text-neutral-300 ml-2 text-sm">
                        {new Date(hackathon.webinar_time).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true, // use 24-hour format? set to false
                          }
                        )}{' '}
                        <a
                          href={hackathon.webinar_link}
                          className="text-blue-700 underline"
                        >
                          Meeting Link
                        </a>
                      </span>
                    </li>
                    <li>
                      <span className="text-neutral-400 text-[14px]">
                        Start Date:
                      </span>
                      <span className="text-neutral-300 ml-2 text-sm">
                        {new Date(hackathon.start_date).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true, // use 24-hour format? set to false
                          }
                        )}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-neutral-400 text-[14px]">
                        End Date:
                      </span>
                      <span className="text-neutral-300 ml-2 text-sm">
                        {new Date(hackathon.end_date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true, // use 24-hour format? set to false
                        })}
                      </span>
                    </li>
                    <li>
                      <span className="text-neutral-400 text-[14px]">
                        Presentation Date:
                      </span>
                      <span className="text-neutral-300 ml-2 text-sm">
                        {new Date(hackathon.presentation_time).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true, // use 24-hour format? set to false
                          }
                        )}{' '}
                        <a
                          href={hackathon.presentation_link}
                          className="text-blue-700 underline"
                        >
                          Meeting Link
                        </a>
                      </span>
                    </li>
                    <li>
                      <span className="text-neutral-400 text-[14px]">
                        Result Date:
                      </span>
                      <span className="text-neutral-300 ml-2 text-sm">
                        {new Date(hackathon.result_time).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true, // use 24-hour format? set to false
                          }
                        )}
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="text-neutral-400 text-[14px]">
                        Location:
                      </span>
                      <span className="text-neutral-300 ml-2 text-sm">
                        Online
                      </span>
                    </li>
                  </ul>
                </div>
                <Badge
                  variant="outline"
                  className="text-sm text-neutral-300 border border-green-400"
                >
                  Rules
                </Badge>
                <div className="flex flex-row items-center gap-5 border border-gray-500/20 p-4 rounded-lg">
                  <ul className="text-sm text-neutral-300 flex flex-col gap-2">
                    <li>
                      <span className="font-bold">Register Team Limit: </span>
                      {hackathon.max_teams}
                    </li>
                    <li>
                      <span className="font-bold">
                        Minimun Participant in One Team:{' '}
                      </span>
                      {hackathon.min_participants}
                    </li>
                    <li>
                      <span className="font-bold">
                        Maximum Participant in One Team:{' '}
                      </span>
                      {hackathon.max_participants}
                    </li>
                    <li>
                      <span className="font-bold">Point to Register: </span>
                      {hackathon.register_point}
                    </li>
                  </ul>
                </div>
                <Badge
                  variant="outline"
                  className="text-sm text-neutral-300 border border-green-400"
                >
                  Prize
                </Badge>
                <div className="text-white">
                  {hackathon.prize_pool ? (
                    <p className="text-2xl font-bold">
                      Prize Pool: {hackathon.prize_pool}
                    </p>
                  ) : (
                    ''
                  )}
                  <p>{hackathon.prize}</p>
                </div>
                {/* {show && (
                  <>
                    <WinnerCard />
                  </>
                )} */}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <h1>Hackathon Not Found.</h1>
        )}
      </div>
    </section>
  );
}
