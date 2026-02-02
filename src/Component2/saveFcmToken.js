import { getToken } from "firebase/messaging";
import { messaging } from "./FirebaseConfig";
import axios from "axios";
import { BASE_URL } from "../config/constants";

export const saveFcmToken = async (candidateId) => {
  try {
    console.log("saveFcmToken called, candidateId:", candidateId);

    const token = await getToken(messaging, {
      vapidKey:
        "BOA4JP6l1J_UvQ1VjBxc9SGlP-IulMYipKnb2EHuz6bvvKTwlf8-r9Y5T5Na1qc4plv2rUxrNs7U_ck8X5oElZc",
    });

    console.log("FCM TOKEN:", token);

    if (token) {
      await axios.post(`${BASE_URL}candidate/save-fcm-token`, {
        fcm_can_id: candidateId,
        fcm_token: token,
      });
      console.log("API called");
    } else {
      console.log("Token is NULL");
    }
  } catch (err) {
    console.log("FCM error", err);
  }
};
