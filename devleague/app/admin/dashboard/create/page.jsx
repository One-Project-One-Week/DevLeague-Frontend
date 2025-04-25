'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/axios';

export default function CreateHackathon() {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    profileImage: null,
    coverImage: null,
    overview: '',
    webinarDateTime: '',
    webinarLink: '',
    startDate: '',
    endDate: '',
    presentationDate: '',
    presentationLink: '',
    resultDate: '',
    maxTeam: '',
    minParticipants: '',
    maxParticipants: '',
    minPoint: '',
    prizePool: '',
    prizeDesc: '',
    firstPoints: '',
    secondPoints: '',
    thirdPoints: '',
  });

  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) router.push('/admin');

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === 'file' && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [id]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create form data object for file uploads
      const submitData = new FormData();

      submitData.append('name', formData['name']);
      submitData.append('max_teams', formData['maxTeam']);
      submitData.append('max_participants', formData['maxParticipants']);
      submitData.append('min_participants', formData['minParticipants']);
      submitData.append('prize', formData['prizeDesc']);
      submitData.append('prize_pool', formData['prizePool']);
      submitData.append('register_point', formData['minPoint']);
      submitData.append('overview', formData['overview']);
      submitData.append('cover_image', formData['coverImage']);
      submitData.append('profile_image', formData['profileImage']);
      submitData.append('webinar_time', formData['webinarDateTime']);
      submitData.append('webinar_link', formData['webinarLink']);
      submitData.append('presentation_time', formData['presentationDate']);
      submitData.append('presentation_link', formData['presentationLink']);
      submitData.append('result_time', formData['resultDate']);
      submitData.append('points_for_first_place', formData['firstPoints']);
      submitData.append('points_for_third_place', formData['thirdPoints']);
      submitData.append('points_for_second_place', formData['secondPoints']);
      submitData.append('start_date', formData['startDate']);
      submitData.append('end_date', formData['endDate']);

      const response = await adminApi.post('admin/hackathons', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        // Redirect to dashboard or success page
        router.push('/admin/dashboard/hackathon');
      } else {
        // Handle error response
        console.error('Failed to create hackathon');
      }
    } catch (error) {
      console.error('Error creating hackathon:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create Hackathon</h1>
        <form
          className="grid gap-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Hackathon Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Hackathon Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter hackathon name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Profile Photo */}
          <div className="grid gap-2">
            <Label htmlFor="profileImage">Profile Photo</Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Cover Photo */}
          <div className="grid gap-2">
            <Label htmlFor="coverImage">Cover Photo</Label>
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Overview Description */}
          <div className="grid gap-2">
            <Label htmlFor="overview">Overview Description</Label>
            <Textarea
              id="overview"
              placeholder="Overview of the hackathon"
              value={formData.overview}
              onChange={handleChange}
              required
            />
          </div>

          {/* Webinar Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="webinarDateTime">Webinar Date & Time</Label>
              <Input
                id="webinarDateTime"
                type="datetime-local"
                value={formData.webinarDateTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="webinarLink">Webinar Link</Label>
              <Input
                id="webinarLink"
                type="url"
                placeholder="https://zoom.us/..."
                value={formData.webinarLink}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Hackathon Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Presentation Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="presentationDate">Presentation Date & Time</Label>
              <Input
                id="presentationDate"
                type="datetime-local"
                value={formData.presentationDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="presentationLink">Presentation Link</Label>
              <Input
                id="presentationLink"
                type="url"
                placeholder="https://meet.google.com/..."
                value={formData.presentationLink}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Result Date */}
          <div className="grid gap-2">
            <Label htmlFor="resultDate">Result Announcement Date</Label>
            <Input
              id="resultDate"
              type="date"
              value={formData.resultDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Team & Participant Limits */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="maxTeam">Maximum Teams</Label>
              <Input
                id="maxTeam"
                type="number"
                min="1"
                value={formData.maxTeam}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minParticipants">Minimum Participants</Label>
              <Input
                id="minParticipants"
                type="number"
                min="1"
                value={formData.minParticipants}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                value={formData.maxParticipants}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Point System */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="minPoint">Minimum Point</Label>
              <Input
                id="minPoint"
                type="number"
                min="0"
                value={formData.minPoint}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="prizePool">Prize Pool Amount</Label>
              <Input
                id="prizePool"
                type="number"
                min="0"
                value={formData.prizePool}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Prize Description */}
          <div className="grid gap-2">
            <Label htmlFor="prizeDesc">Prize Description</Label>
            <Textarea
              id="prizeDesc"
              placeholder="Explain prizes and awards..."
              value={formData.prizeDesc}
              onChange={handleChange}
              required
            />
          </div>

          {/* Points for Ranks */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstPoints">Points for 1st Place</Label>
              <Input
                id="firstPoints"
                type="number"
                min="0"
                value={formData.firstPoints}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondPoints">Points for 2nd Place</Label>
              <Input
                id="secondPoints"
                type="number"
                min="0"
                value={formData.secondPoints}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thirdPoints">Points for 3rd Place</Label>
              <Input
                id="thirdPoints"
                type="number"
                min="0"
                value={formData.thirdPoints}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Hackathon'}
          </Button>
        </form>
      </div>
    </div>
  );
}
