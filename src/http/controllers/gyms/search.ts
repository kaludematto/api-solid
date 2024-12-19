import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymsQuerySchema.parse(request.query)

  const searchGymQuerySchema = makeSearchGymsUseCase()

  const { gyms } = await searchGymQuerySchema.execute({
    query,
    page,
  })

  return reply.status(201).send({
    gyms,
  })
}
