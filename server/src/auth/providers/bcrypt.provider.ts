import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptProvider {
	public async hashPassword(password: string | Buffer): Promise<string> {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}

	public comparePassword(
		password: string | Buffer,
		hash: string
	): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
