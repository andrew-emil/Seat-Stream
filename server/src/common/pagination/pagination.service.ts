import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { PaginationDto } from "./dtos/pagination.dto";
import { REQUEST } from "@nestjs/core";
import { Paginated } from "./interface/paginated.interface";
import { Request } from "express";

@Injectable()
export class PaginationService {
	constructor(
		@Inject(REQUEST)
		private readonly request: Request
	) {}

	public async paginate<T>(
		model: Model<T>,
		paginationQuery: PaginationDto,
	): Promise<Paginated<T>> {
		const { limit, page, select, populate } = paginationQuery;
		const skip = (page! - 1) * limit!;

		const result = await model
			.find(paginationQuery.where ?? {})
			.sort(paginationQuery.sort ?? {})
			.skip(skip)
			.limit(limit!)
			.select(select ?? "")
			.populate(populate ?? "");

		const totalItems = await model.countDocuments(paginationQuery.where ?? {});
		const totalPages = Math.ceil(totalItems / paginationQuery.limit!);
		const nextPage =
			paginationQuery.page === totalPages
				? paginationQuery.page
				: paginationQuery.page! + 1;

		const previousPage =
			paginationQuery.page === 1
				? paginationQuery.page
				: paginationQuery.page! - 1;

		const baseUrl = `${this.request.protocol}://${this.request.get("host")}`;
		const url = new URL(this.request.url, baseUrl);

		const response: Paginated<T> = {
			data: result,
			meta: {
				itemsPerPage: paginationQuery.limit!,
				totalItems,
				totalPages,
				currentPage: paginationQuery.page!,
			},
			links: {
				first: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=1`,
				last: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
				next: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
				previous: `${url.origin}${url.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
			},
		};

		return response;
	}
}
