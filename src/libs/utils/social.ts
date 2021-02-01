import fetch from 'isomorphic-unfetch';
import { google } from 'googleapis';
import axios from 'axios';
import qs from 'qs';
import { devServer, isProd, prodServer } from '../constants';

// Social Github
interface GithubUserType {
  id: string;
  name: string;
  avatar_url: string;
}

export async function getGithubToken(code: string): Promise<string> {
  try {
    const data = await fetch('https://github.com/login/oauth/access_token', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }).then((res) => res.json());

    return data.access_token;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getGithubUser(token: string): Promise<GithubUserType> {
  try {
    const data = await fetch(`https://api.github.com/user?access_token=${token}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res) => res.json());

    return data;
  } catch (err) {
    throw new Error(err);
  }
}

// Social Google
interface GoogleAuthParams {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUrl: string;
}

export const callback = `${isProd ? prodServer : devServer}/social/google/callback`;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  callback
);

export const url = oauth2Client.generateAuthUrl({
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
});

export async function getGoogleAccessToken({
  clientId,
  clientSecret,
  code,
  redirectUrl,
}: GoogleAuthParams) {
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
  const { tokens } = await oauth2Client.getToken(code);

  if (!tokens.access_token) throw new Error('Failed to retrive google access token');

  return tokens.access_token;
}

export async function getGoogleUser(token: string) {
  const people = google.people('v1');
  const profile = await people.people.get({
    access_token: token,
    resourceName: 'people/me',
    personFields: 'names,emailAddresses,photos',
  });

  const { data } = profile;
  const user = {
    username: data.names![0].displayName || '',
    email: data.emailAddresses![0].value || null,
    thumbnail: data.photos![0].url || null,
    googleId: data.resourceName!.replace('people/', ''),
  };

  return user;
}

// Social Kakao
export const kakao = {
  clientId: process.env.KAKAO_CLIENT_ID,
  clientSecret: process.env.KAKAO_CLIENT_SECRET,
  redirectUrl: `${isProd ? prodServer : devServer}/social/kakao/callback`,
};

export async function getKakaoToken(code: string) {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: kakao.clientId,
        client_secret: kakao.clientSecret,
        redirect_uri: kakao.redirectUrl,
        code,
      }),
    });

    if (!response.data) {
      throw new Error(response.data.error);
    }

    return response.data.access_token;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getKakaoUser(token: string) {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}
