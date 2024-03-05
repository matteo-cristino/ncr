//@ts-nocheck
import { Slangroom } from '@slangroom/core';
import { type Slangroom as SlangroomType } from '@slangroom/core/build/esm/src/slangroom';
import { fs } from '@slangroom/fs';
import { git } from '@slangroom/git';
import { http } from '@slangroom/http';
import { JSONSchema } from '@slangroom/json-schema';
import { oauth } from '@slangroom/oauth';
import { pocketbase } from '@slangroom/pocketbase';
import { qrcode } from '@slangroom/qrcode';
import { redis } from '@slangroom/redis';
import { shell } from '@slangroom/shell';
import { timestamp } from '@slangroom/timestamp';
import { wallet } from '@slangroom/wallet';
import { zencode } from '@slangroom/zencode';

//

const SLANGROOM_PLUGINS = [fs, git, http, JSONSchema, oauth, pocketbase, qrcode, redis, shell, timestamp, wallet, zencode];

export class SlangroomManager {
	private static instance: SlangroomType;

	private constructor() { }

	public static getInstance(): SlangroomType {
		if (!SlangroomManager.instance) {
			SlangroomManager.instance = new Slangroom(SLANGROOM_PLUGINS);
		}
		return SlangroomManager.instance;
	}
}
