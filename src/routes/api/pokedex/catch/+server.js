import Jwt  from 'jsonwebtoken';
import seniorModel from '$lib/db/senior';
import juniorModel from '$lib/db/junior';
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, locals }) {
  const token = request.headers.get('authorization').split(' ')[1];
  const {qr_code} = await request.json();
  if (!qr_code) {
    throw error(400, "Missing Parameters");
  }

  const {senior_id} = Jwt.decode(qr_code.data, 'sairahut_super_secret');
  const {user} = Jwt.decode(token, 'sairahut_super_secret');
  const senior = await seniorModel.findOne({std_id: senior_id});
  const junior = await juniorModel.find({pokemon_id: senior.pokemon_id});
  const iam = await juniorModel.findOne({std_id: user.std_id});
  const isFoundSenior = junior.some(j => j.std_id === user.std_id)

  if (iam.senior_found) {
    throw error(400, "You have already found your senior");
  }
  if (iam.quota_left <= 0) {
    throw error(400, "Quota is full");
  }
  iam.quota_left -= 1;
  
  if (isFoundSenior) {
    iam.senior_found = true;
    senior.junior_found += 1;
    if (senior.junior_found >= senior.has_junior) {
      senior.wanted = true;
    }
  }
  await iam.save();
  await senior.save();
  console.log(senior);
  console.log(junior);
  console.log(iam);
  return new Response(JSON.stringify({isFoundSenior}));
}
