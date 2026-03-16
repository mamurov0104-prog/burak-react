/**
 * PRODUCT SERVICE
 *
 * Bu class frontend va backend orasidagi ko‘prik.
 *
 * Componentlar axios ishlatmaydi.
 * Ular faqat service methodlarini chaqiradi.
 *
 * Architecture:
 *
 * Component
 *    ↓
 * ProductService
 *    ↓
 * Axios
 *    ↓
 * Backend API
 */

import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

class ProductService {

  /**
   * backend base URL
   */
  private readonly path: string;

  constructor() {

    /**
     * config dan serverApi olinadi.
     * masalan:
     *
     * http://localhost:3003
     */
    this.path = serverApi;
  }

  /**
   * PRODUCTLARNI OLISH
   *
   * Bu method backendga query yuboradi.
   *
   * Endpoint:
   *   GET /product/all
   *
   * Query:
   *   order
   *   page
   *   limit
   *   productCollection
   *   search
   *
   * Natija:
   *   Product[] array
   */
  public async getProducts(input: ProductInquiry): Promise<Product[]> {

    try {

      /**
       * URL dinamik yaratiladi.
       *
       * Misol:
       * http://localhost:3003/product/all?page=1&limit=4&order=productViews
       */
      let url =
        `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      /**
       * Agar productCollection bo‘lsa qo‘shiladi.
       */
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;

      /**
       * Agar search mavjud bo‘lsa
       * backendga search query yuboriladi.
       */
      if (input.search)
        url += `&search=${input.search}`;

      /**
       * Axios GET request
       */
      const result = await axios.get(url);

      /**
       * result.data = backend response
       */
      return result.data;

    } catch (err) {

     
      console.log("Error, getProduct:", err);
      throw err;

    }
  }

  public async getProduct(productId: string): Promise<Product> {

    try {

      const url = `${serverApi}/product/${productId}`;

      const result = await axios.get(url, {
        withCredentials: true,
      });

      return result.data;

    } catch (err) {
      console.log("Error, getProduct", err);
      throw err;
    }
  }
}

export default ProductService;
