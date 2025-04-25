"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"

export default function CreateHackathon() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-100">
      <div className="w-full max-w-3xl bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create Hackathon</h1>
        <form className="grid gap-6">
          {/* Hackathon Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Hackathon Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter hackathon name"
              required
            />
          </div>

          {/* Profile Photo */}
          <div className="grid gap-2">
            <Label htmlFor="profilePhoto">Profile Photo</Label>
            <Input id="profilePhoto" type="file" accept="image/*" required />
          </div>

          {/* Cover Photo */}
          <div className="grid gap-2">
            <Label htmlFor="coverPhoto">Cover Photo</Label>
            <Input id="coverPhoto" type="file" accept="image/*" required />
          </div>

          {/* Overview Description */}
          <div className="grid gap-2">
            <Label htmlFor="overview">Overview Description</Label>
            <Textarea
              id="overview"
              placeholder="Overview of the hackathon"
              required
            />
          </div>

          {/* Webinar Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="webinarDateTime">Webinar Date & Time</Label>
              <Input id="webinarDateTime" type="datetime-local" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="webinarLink">Webinar Link</Label>
              <Input
                id="webinarLink"
                type="url"
                placeholder="https://zoom.us/..."
                required
              />
            </div>
          </div>

          {/* Hackathon Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <Input id="startDate" type="datetime-local" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input id="endDate" type="datetime-local" required />
            </div>
          </div>

          {/* Presentation Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="presentationDate">Presentation Date & Time</Label>
              <Input id="presentationDate" type="datetime-local" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="presentationLink">Presentation Link</Label>
              <Input
                id="presentationLink"
                type="url"
                placeholder="https://meet.google.com/..."
                required
              />
            </div>
          </div>

          {/* Result Date */}
          <div className="grid gap-2">
            <Label htmlFor="resultDate">Result Announcement Date</Label>
            <Input id="resultDate" type="date" required />
          </div>

          {/* Team & Participant Limits */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="minTeam">Minimum Teams</Label>
              <Input id="minTeam" type="number" min="1" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxTeam">Maximum Teams</Label>
              <Input id="maxTeam" type="number" min="1" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minParticipants">Minimum Participants</Label>
              <Input id="minParticipants" type="number" min="1" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Input id="maxParticipants" type="number" min="1" required />
            </div>
          </div>

          {/* Point System */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="minPoint">Minimum Point</Label>
              <Input id="minPoint" type="number" min="0" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxPoint">Maximum Point</Label>
              <Input id="maxPoint" type="number" min="0" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="prizePool">Prize Pool Amount</Label>
              <Input id="prizePool" type="number" min="0" required />
            </div>
          </div>

          {/* Prize Description */}
          <div className="grid gap-2">
            <Label htmlFor="prizeDesc">Prize Description</Label>
            <Textarea
              id="prizeDesc"
              placeholder="Explain prizes and awards..."
              required
            />
          </div>

          {/* Points for Ranks */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstPoints">Points for 1st Place</Label>
              <Input id="firstPoints" type="number" min="0" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="secondPoints">Points for 2nd Place</Label>
              <Input id="secondPoints" type="number" min="0" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="thirdPoints">Points for 3rd Place</Label>
              <Input id="thirdPoints" type="number" min="0" required />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Create Hackathon
          </Button>
        </form>
      </div>
    </div>
  )
}
