"use server";
import { MongoClient } from "mongodb";
import User from "@/types/user";
import Repo from "@/types/repo";
import UserMongo from "@/types/userMongo";

async function connectToMongo() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

async function closeMongoConnection(client: MongoClient) {
  await client.close();
}

export async function getUserSavedRepos(
  login: string
): Promise<Repo[] | undefined> {
  console.log("Fetching saved repos for user: ", login);
  const client = await connectToMongo();
  try {
    const database = client.db("local");
    const usersCollection = database.collection<UserMongo>("users");
    const user = await usersCollection.findOne({ login });
    return user?.savedRepos ?? ([] as Repo[]);
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    await closeMongoConnection(client);
  }
}

export async function toggleRepoForUser(
  login: string,
  repo: Repo
): Promise<boolean | null> {
  const client = await connectToMongo();
  try {
    const database = client.db("local");
    const usersCollection = database.collection<UserMongo>("users");
    const user = await usersCollection.findOne({ login });

    if (!user) {
      const newUser: UserMongo = {
        login,
        savedRepos: [repo],
      };
      await usersCollection.insertOne(newUser);
      return true;
    }

    const repoIndex = user.savedRepos.findIndex(
      (savedRepo) => savedRepo.id === repo.id
    );

    let newRepoExists = true;
    if (repoIndex !== -1) {
      newRepoExists = false;
      user.savedRepos.splice(repoIndex, 1);
    } else {
      user.savedRepos.push(repo);
    }

    await usersCollection.updateOne(
      { login },
      { $set: { savedRepos: user.savedRepos } }
    );

    return newRepoExists;
  } catch (e) {
    console.error(e);
    // @ts-ignore
    return e;
  } finally {
    await closeMongoConnection(client);
  }
}
