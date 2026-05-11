"use client"

import { useGetClientByIdQuery } from "@/src/services/api"
import { Link } from "@/src/i18n/navigation"
import { useParams } from "next/navigation"

export default function ClientDetailsPage() {
  const params = useParams()
  const id = params.id as string

  const { data, isLoading, isError } = useGetClientByIdQuery(id)

  if (isLoading) return <div>Loading client...</div>

  if (isError) return <div className="text-red-500">Error loading client</div>

  if (!data) return <div>Client not found</div>

  return (
    <div>
      <Link href="/dashboard/clients" className="mb-5 inline-block text-blue-600">
        Back
      </Link>

      <div className="max-w-[700px] rounded bg-white p-6 shadow">
        <img
          src={data.image}
          alt={data.firstName}
          className="mb-4 h-24 w-24 rounded-full"
        />

        <h1 className="mb-4 text-3xl font-bold">
          {data.firstName} {data.lastName}
        </h1>

        <p>
          <b>Email:</b> {data.email}
        </p>

        <p>
          <b>Phone:</b> {data.phone}
        </p>

        <p>
          <b>Address:</b> {data.address}
        </p>

        <p>
          <b>Company:</b> {data.company}
        </p>

        <div className="mt-5 rounded bg-slate-100 p-4">
          <h2 className="mb-2 text-xl font-bold">Extra Info</h2>
          <p>Tasks / posts / todos can be here.</p>
        </div>
      </div>
    </div>
  )
}