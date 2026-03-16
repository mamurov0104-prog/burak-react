/**
 * MEMBER SERVICE
 *
 * Bu class frontend va backend orasidagi USER bilan bog‘liq barcha
 * API aloqalarni boshqaradi.
 *
 * Ya’ni:
 *   - user signup
 *   - user login
 *   - user logout
 *   - user profile update
 *   - restaurant info
 *   - top users
 *
 * hammasi shu service orqali amalga oshadi.
 *
 * Architecture flow:
 *
 * React Component
 *       ↓
 * MemberService method
 *       ↓
 * Axios HTTP request
 *       ↓
 * Backend API (Node / Express)
 *       ↓
 * Response (JSON)
 *       ↓
 * Frontend state yoki LocalStorage
 */

import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput
} from "../../lib/types/member";

import { serverApi } from "../../lib/config";

import axios from "axios";

/**
 * MemberService class
 *
 * Bu class barcha user-related API requestlarni bir joyda boshqaradi.
 * Componentlar axios bilan to‘g‘ridan-to‘g‘ri ishlamaydi.
 */
class MemberService {

  /**
   * Backend base URL
   *
   * misol:
   *   http://localhost:3003
   */
  private readonly path: string;

  constructor() {

    /**
     * serverApi config fayldan olinadi.
     * Bu frontendning backend bilan asosiy ulanish manzili.
     */
    this.path = serverApi;

  }

  /**
   * =================================================
   * GET TOP USERS
   * =================================================
   *
   * Vazifa:
   *   eng faol userlarni backenddan olish
   *
   * Backend endpoint:
   *   GET /member/top-users
   *
   * Natija:
   *   Member[] array
   *
   * Bu data HomePage ichidagi ActiveUsers componentda ishlatiladi.
   */

  public async getTopUsers(): Promise<Member[]> {

    try {

      /**
       * Endpoint URL
       */
      const url = `${this.path}/member/top-users`;

      /**
       * Axios GET request
       */
      const result = await axios.get(url);

      /**
       * result.data = backenddan kelgan userlar ro‘yxati
       */
      return result.data;

    } catch (err) {

      /**
       * Agar backend xato qaytarsa
       */
      console.log("Error, getTopUsers:", err);

      throw err;

    }

  }

  /**
   * =================================================
   * GET RESTAURANT
   * =================================================
   *
   * Vazifa:
   *   platformadagi restaurant ma'lumotlarini olish
   *
   * Backend endpoint:
   *   GET /member/restaurant
   *
   * Natija:
   *   Member object
   *
   * Bu restaurant profile sahifasida ishlatiladi.
   */

  public async getRestaurant(): Promise<Member> {

    try {

      const url = `${this.path}/member/restaurant`;

      /**
       * Backenddan restaurant data olinadi
       */
      const result = await axios.get(url);

      console.log("getRestaurant:", result);

      /**
       * JSON response Member typega cast qilinadi
       */
      const restaurant: Member = result.data;

      return restaurant;

    } catch (err) {

      console.log("Error, getRestaurant:", err);

      throw err;

    }

  }

  /**
   * =================================================
   * SIGNUP (USER REGISTRATION)
   * =================================================
   *
   * Vazifa:
   *   yangi user yaratish
   *
   * Backend endpoint:
   *   POST /member/signup
   *
   * Frontend yuboradigan data:
   *   memberNick
   *   memberPhone
   *   memberPassword
   *   memberType
   *
   * Backend javobi:
   *   member object
   *
   * Natija:
   *   user LocalStorage ga saqlanadi
   */

  public async signup(input: MemberInput): Promise<Member> {

    try {

      /**
       * signup endpoint
       */
      const url = this.path + "/member/signup";

      /**
       * POST request orqali
       * user registration data yuboriladi
       */
      const result = await axios.post(url, input, {

        /**
         * withCredentials:
         *
         * backend cookie yuborishi mumkin
         * browser cookie saqlashi uchun kerak
         */
        withCredentials: true,

      });

      console.log("signup:", result);

      /**
       * backend response:
       *
       * {
       *   member: {...}
       * }
       */
      const member: Member = result.data.member;

      console.log("member:", member);

      /**
       * LocalStorage ga user saqlanadi
       *
       * Nega?
       * Sahifa refresh bo‘lsa ham user login bo‘lib qoladi.
       */
      localStorage.setItem(
        "memberData",
        JSON.stringify(member)
      );

      return member;

    } catch (err) {

      console.log("Error, signup", err);

      throw err;

    }

  }

  /**
   * =================================================
   * LOGIN
   * =================================================
   *
   * Vazifa:
   *   mavjud userni tizimga kiritish
   *
   * Backend endpoint:
   *   POST /member/login
   *
   * Input:
   *   phone
   *   password
   *
   * Backend javobi:
   *   member object
   *
   * Natija:
   *   cookie + LocalStorage
   */

  public async login(input: LoginInput): Promise<Member> {

    try {

      const url = this.path + "/member/login";

      /**
       * Login request
       */
      const result = await axios.post(url, input, {

        /**
         * withCredentials:
         *
         * Backend cookie yuboradi
         * Browser cookie saqlaydi
         */
        withCredentials: true,

      });

      console.log("login:", result);

      /**
       * Backenddan kelgan user
       */
      const member: Member = result.data.member;

      console.log("member:", member);

      /**
       * LocalStorage ga user saqlanadi
       *
       * Key:
       *   memberData
       */
      localStorage.setItem(
        "memberData",
        JSON.stringify(member)
      );

      return member;

    } catch (err) {

      console.log("Error, login:", err);

      throw err;

    }

  }

  /**
   * =================================================
   * LOGOUT
   * =================================================
   *
   * Vazifa:
   *   userni tizimdan chiqarish
   *
   * Backend endpoint:
   *   POST /member/logout
   *
   * Natija:
   *   cookie o‘chiriladi
   *   localStorage tozalanadi
   */

  public async logout(): Promise<void> {

    try {

      const url = this.path + "/member/logout";

      /**
       * Logout request
       */
      const result = await axios.post(
        url,
        {},
        { withCredentials: true }
      );

      console.log("logout", result);

      /**
       * Frontend local user data o‘chiriladi
       */
      localStorage.removeItem("memberData");

    } catch (err) {

      console.log("Error, logout:", err);

      throw err;

    }

  }

  /**
   * =================================================
   * UPDATE MEMBER PROFILE
   * =================================================
   *
   * Vazifa:
   *   user profilini yangilash
   *
   * Backend endpoint:
   *   POST /member/update
   *
   * Nega FormData?
   * Chunki rasm upload qilinadi.
   */

  public async updateMember(input: MemberUpdateInput): Promise<Member> {

    try {

      /**
       * FormData yaratamiz
       *
       * Bu rasm yoki file yuborishda ishlatiladi.
       */
      const formData = new FormData();

      formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberAddress", input.memberAddress || "");
      formData.append("memberDesc", input.memberDesc || "");
      formData.append("memberImage", input.memberImage || "");

      const url = `${this.path}/member/update`;

      /**
       * Axios request
       */
      const result = await axios(url, {

        method: "POST",

        data: formData,

        withCredentials: true,

        headers: {
          /**
           * multipart/form-data
           * file upload uchun kerak
           */
          "Content-Type": "multipart/form-data",
        },

      });

      console.log("updateMember:", result);

      /**
       * Yangilangan user
       */
      const member: Member = result.data;

      /**
       * LocalStorage ham yangilanadi
       */
      localStorage.setItem(
        "memberData",
        JSON.stringify(member)
      );

      return member;

    } catch (err) {

      console.log("Error, update", err);

      throw err;

    }

  }

}

export default MemberService;