'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userApi } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

const mockTeams = [
  { id: 1, name: 'Code Wizards', members: 3 },
  { id: 2, name: 'Bug Busters', members: 4 },
  { id: 3, name: 'React Ninjas', members: 2 },
  { id: 4, name: 'Code', members: 3 },
  { id: 5, name: 'Varriors', members: 3 },
  { id: 6, name: 'Dello', members: 3 },
  { id: 7, name: 'Yello Yeeoo teeeekkkk aksdflkj', members: 3 },
  { id: 8, name: 'Ok', members: 3 },
];

const mockTeamMembers = [
  { name: 'Shinn', initials: 'SH' },
  { name: 'Alex', initials: 'AL' },
  { name: 'Nova', initials: 'NO' },
];

export default function TeamPage() {
  const { setUser, user } = useAuth();
  const router = useRouter();
  const [hasTeam, setHasTeam] = useState(user?.team_id ? true : false);
  const [formData, setFormData] = useState({
    teamName: '',
    teamProfile: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teams, setTeams] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        await fetchTeams();

        if (user?.team_id) {
          const response = await userApi.get(`/teams/${user.team_id}`);
          if (response.data && response.data.data) {
            setTeam(response.data.data);
          }
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [user?.team_id]);

  const fetchTeams = async () => {
    try {
      const response = await userApi.get('/teams');
      if (response.data && response.data.data) {
        setTeams(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files.length > 0) {
      setFormData({ ...formData, teamProfile: files[0] });
      setPreviewUrl(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    } else if (formData.teamName.length < 3) {
      newErrors.teamName = 'Team name must be at least 3 characters';
    }

    if (!formData.teamProfile) {
      newErrors.teamProfile = 'Team profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTeamCreate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('name', formData.teamName);
      submitData.append('profile_image', formData.teamProfile);

      const response = await userApi.post('/teams', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        const res = await userApi.get('auth/me', {
          withCredentials: true,
        });
        if (res.status === 200) {
          setUser(res.data.data);
        }

        await fetchTeams();
        setHasTeam(true);

        if (response.data && response.data.data) {
          setTeam(response.data.data);
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to create team. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleJoinTeam = async (teamId) => {
    try {
      setIsSubmitting(true);
      const response = await userApi.post(`/teams/join/${teamId}`);

      if (response.status === 200 || response.status === 201) {
        setHasTeam(true);
        const res = await userApi.get('auth/me', {
          withCredentials: true,
        });
        if (res.status === 200) {
          setUser(res.data.data);
        }

        await fetchTeams();

        if (response.data && response.data.data) {
          setTeam(response.data.data);
        } else {
          // Fetch team details after joining
          const teamResponse = await userApi.get(`/teams/${teamId}`);
          if (teamResponse.data && teamResponse.data.data) {
            setTeam(teamResponse.data.data);
          }
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Failed to join team. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl min-h-screen mx-auto px-4 flex flex-col pt-40 pb-20">
        <div className="flex justify-center items-center h-96">
          <p className="text-[#EAEAEA]">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl min-h-screen mx-auto px-4 flex flex-col pt-40 pb-20">
      {errors.general && (
        <div className="bg-red-500/20 border border-red-500 rounded p-3 mb-4">
          <p className="text-red-500 text-sm text-center">{errors.general}</p>
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-30">
        {/* Left Column */}
        <motion.div
          className="w-full lg:w-3/5"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="rounded-xl p-6 shadow-lg border bg-[#130F3F]/60">
            <h3 className="text-2xl font-semibold text-[#EAEAEA] mb-6">
              Available Teams
            </h3>
            <Table className="text-[#EAEAEA] text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#1DF53A]">Team</TableHead>
                  <TableHead className="text-[#1DF53A]">Members</TableHead>
                  {!hasTeam && (
                    <TableHead className="text-[#1DF53A]">Action</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.length > 0 ? (
                  teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>{team.name}</TableCell>
                      <TableCell className="">
                        {team._count?.members || 0}
                      </TableCell>
                      {!hasTeam && (
                        <TableCell>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="text-sm text-neutral-300 border border-green-400 hover:bg-[#17c72f]"
                                disabled={isSubmitting}
                              >
                                Join
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-[#0D0D0E] border border-[#1DF53A] text-[#EAEAEA]">
                              <AlertDialogHeader>
                                Are you sure you want to join "{team.name}"?
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleJoinTeam(team.id)}
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ? 'Joining...' : 'Confirm'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={hasTeam ? 2 : 3}
                      className="text-center py-4"
                    >
                      No teams available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="w-full lg:w-2/5"
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
        >
          <motion.div className="rounded-xl p-6 shadow-lg border bg-[#130F3F]/60">
            {!hasTeam ? (
              <>
                <h3 className="text-2xl font-semibold text-[#EAEAEA] mb-6">
                  Create Your Team
                </h3>

                <form className="space-y-4" onSubmit={handleTeamCreate}>
                  <div>
                    <Label className="text-[#EAEAEA] mb-3" htmlFor="teamName">
                      Team Name
                    </Label>
                    <Input
                      id="teamName"
                      name="teamName"
                      className="bg-[#0D0D0E] text-[#EAEAEA] placeholder:text-neutral-500 mb-1"
                      placeholder="Enter team name"
                      value={formData.teamName}
                      onChange={handleChange}
                    />
                    {errors.teamName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.teamName}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      className="text-[#EAEAEA] mb-3"
                      htmlFor="teamProfile"
                    >
                      Team Profile Photo
                    </Label>
                    <Input
                      id="teamProfile"
                      name="teamProfile"
                      type="file"
                      accept="image/*"
                      className="text-[#EAEAEA] mb-1"
                      onChange={handleChange}
                    />
                    {errors.teamProfile && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.teamProfile}
                      </p>
                    )}
                  </div>

                  {previewUrl && (
                    <div className="mt-2">
                      <img
                        src={previewUrl}
                        alt="Team Profile"
                        className="w-20 h-20 rounded-full border border-[#1DF53A]"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="mx-auto block px-4 py-2 text-sm text-neutral-300 border border-green-400 hover:bg-[#17c72f] mb-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create'}
                  </Button>
                </form>
              </>
            ) : team ? (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={`${process.env.API}/${team.profile_image}`}
                    alt="Team Avatar"
                    className="w-20 h-20 rounded-full border border-[#1DF53A]"
                  />
                  <div>
                    <h3 className="text-xl text-[#EAEAEA] font-semibold">
                      {team.name}
                    </h3>
                  </div>
                </div>

                <h4 className="text-[#EAEAEA] mb-3 font-semibold">
                  Team Members
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {team.members && team.members.length > 0 ? (
                    team.members.map((member, index) => (
                      <motion.div
                        key={member.id || index}
                        variants={stepVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index}
                        className="flex items-center space-x-3 bg-[#0D0D0E]/70 p-2 rounded-lg"
                      >
                        <Avatar className="h-9 w-9 border border-[#1DF53A]">
                          <AvatarFallback>
                            {member.username
                              ? member.username.substring(0, 2).toUpperCase()
                              : '??'}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-[#EAEAEA] text-sm">
                          {member.username || 'Unknown User'}
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-[#EAEAEA] col-span-2 text-center">
                      No team members found
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-40">
                <p className="text-[#EAEAEA]">Loading team information...</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
