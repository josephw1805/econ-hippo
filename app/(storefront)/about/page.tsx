import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

export default function AboutRoute() {
  const data = [
    {
      Date: "September 23, 2023",
      City: "Taipei",
      Venue: "Taipei Arena",
    },
    {
      Date: "September 24, 2023",
      City: "Taipei",
      Venue: "Taipei Arena",
    },
    {
      Date: "October 14, 2023",
      City: "Shanghai",
      Venue: "Mercedes-Benz Arena",
    },
    {
      Date: "October 21, 2023",
      City: "	Wuxi",
      Venue: "Wuxi Sports Center",
    },
    {
      Date: "October 28, 2023",
      City: "Fuzhou",
      Venue: "Haixia Olympic Center",
    },
    {
      Date: "November 4, 2023",
      City: "Guangzhou",
      Venue: "Guangzhou Gymnasium",
    },
    {
      Date: "November 11, 2023",
      City: "Zhengzhou",
      Venue: "Zhengzhou Olympic Sports Center",
    },
    {
      Date: "December 2, 2023",
      City: "Chongqing",
      Venue: "Chongqing International Expo Center",
    },
    {
      Date: "December 9, 2023",
      City: "Nanchang",
      Venue: "Nanchang International Stadium",
    },
    {
      Date: "December 16, 2023",
      City: "Xi'an",
      Venue: "Xi'an Olympic Sports Center",
    },
    {
      Date: "December 23, 2023",
      City: "Chengdu",
      Venue: "Chengdu Financial City Performing Center",
    },
    {
      Date: "January 6, 2024",
      City: "Dalian",
      Venue: "Dalian Sports Centre Stadium",
    },
    {
      Date: "January 13, 2024",
      City: "Shenzhen",
      Venue: "Shenzhen Bay Sports Center",
    },
    {
      Date: "January 20, 2024",
      City: "Hefei",
      Venue: "Hefei Binhu International Convention and Exhibition Center",
    },
    {
      Date: "January 27, 2024",
      City: "Suzhou",
      Venue: "Suzhou Olympic Sports Centre",
    },
    {
      Date: "March 9, 2024",
      City: "Quanzhou",
      Venue: "Quanzhou Jinjiang Sports Center",
    },
    {
      Date: "March 22, 2024",
      City: "Genting Highlands",
      Venue: "Arena of Stars",
    },
    {
      Date: "March 30, 2024",
      City: "Macau",
      Venue: "Galaxy Arena",
    },
    {
      Date: "April 6, 2024",
      City: "Beijing",
      Venue: "National Indoor Stadium",
    },
    {
      Date: "April 7, 2024",
      City: "Beijing",
      Venue: "National Indoor Stadium",
    },
    {
      Date: "April 13, 2024",
      City: "Tianjin",
      Venue: "Tianjin Gymnasium",
    },
    {
      Date: "April 20, 2024",
      City: "Nanjing",
      Venue: "Nanjing Olympic Sports Center Gymnasium",
    },
    {
      Date: "April 27, 2024",
      City: "Jinan",
      Venue: "Jinan Olympic Sports Center Gymnasium",
    },
    {
      Date: "May 4, 2024",
      City: "Wuhan",
      Venue: "Wuhan Sports Center Gymnasium",
    },
    {
      Date: "May 11, 2024",
      City: "Ningbo",
      Venue: "Ningbo Olympic Sports Center Gymnasium",
    },
    {
      Date: "May 18, 2024",
      City: "Foshan",
      Venue: "Foshan International Sports Culture",
    },
    {
      Date: "June 1, 2024",
      City: "Hangzhou",
      Venue: "Hangzhou OSC Gymnasium",
    },
    {
      Date: "June 9, 2024",
      City: "Xiamen",
      Venue: "Xiamen OSC Gymnasium",
    },
    {
      Date: "June 15, 2024",
      City: "Changsha",
      Venue: "Hunan International Convention and Exhibition Center",
    },
    {
      Date: "June 22, 2024",
      City: "Xiamen",
      Venue: "Shanxi Sports Center Gymnasium",
    },
    {
      Date: "June 29, 2024",
      City: "Qingdao",
      Venue: "Qingdao Citizen Fitness Center Gymnasium",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="w-full flex flex-col justify-center">
          <h3 className="mb-5 text-3xl">Sugar High World Tour</h3>
          <p className="pb-5">
            Sugar High World Tour is the third concert tour by Taiwanese singer
            Cyndi Wang, held in support of her thirteenth studio album Bite Back
            (2023). The tour began in Taipei at the Taipei Arena on September
            23, 2023.
          </p>
          <Button>
            <Link href="/products/all">Visit Shop</Link>
          </Button>
        </div>
        <Image
          src="https://utfs.io/f/44b64020-b9b4-479d-88fd-f9101bd9dfdd-1xcy7.png"
          width={800}
          height={500}
          alt="first about image"
          priority
          className="hidden md:flex"
        />
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <Image
          src="https://utfs.io/f/8c91eeeb-9ced-4baf-be67-28f829ba3683-1xcy6.png"
          width={800}
          height={500}
          alt="first about image"
          priority
          className="hidden md:flex"
        />
        <div className="w-full flex flex-col">
          <h3 className="mb-5 text-3xl">Tour dates</h3>
          <div className="pb-5 max-h-[700px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>City</TableHead>
                  {/* <TableHead>Country</TableHead> */}
                  <TableHead>Venue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.Date}</TableCell>
                    <TableCell className="font-medium">{item.City}</TableCell>
                    {/* <TableCell>{item.Country}</TableCell> */}
                    <TableCell>{item.Venue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
