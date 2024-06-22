import { StepBack } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Github, CornerRightUp, MoveRight, DollarSign } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import Image from "next/image"
import ListRetro from "../../public/start-retro.webp"
import CreateRetro from "../../public/create-note.webp"

export default function Dashboard() {
  return (
    <div className="p-10 ">
      <div className="flex justify-between">
        <div className="flex">
          <StepBack className="h-10 w-10" />
          <h1 className="text-md mt-2 md:mt-1 md:text-2xl tracking-wide font-light uppercase ">Retro Notes</h1>
        </div>
        <div>
          <Link href="/dashboard">
            <Button className="mx-2 ">
              Get Started
              <CornerRightUp className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col  w-full p-10 mt-10 border  border-dashed border-b-0 border-gray shadow-md shadow-gray-950 mix-blend-screen">

        <div className="flex flex-col items-center gap-4 ">
          <div>
            <h1 className="text-4xl md:text-8xl text-center font-bold ">
              Enhance Retrospectives
            </h1>

            <h1 className="text-xl text-center font-sans font-thin  text-lime-400 subpixel-antialiased">
              Drive Continuous Improvement with RetroNotes – Collaborative and Free
            </h1>
          </div>
          <div className="flex mt-4">
            <div >
              <Link href="/dashboard">
                <Button className="mx-2 ">
                  Get Started
                  <CornerRightUp className="size-5" />

                </Button>
              </Link>

            </div>
            <div>
              <Link target="_blank" href="https://github.com/retronotes">
                <Button variant="secondary" className="mx-2">
                  <Github className="size-5" />
                  Contribute
                </Button>
              </Link>
            </div>

          </div>
        </div>

        <div>
          <div>
            <h1 className="font-thin font-sans text-lime-500 mt-5">CREATE RETRO</h1>
            <div className="border border-dashed border-gray shadow-2xl shadow-gray-900 mix-blend-exclusion">
              <Image
                src={CreateRetro}
                width={1800}
                height={600}
                alt="Create RetroImg"
                placeholder="blur"
                priority
              >
              </Image>
            </div>
            <div>
              <h1 className="font-thin font-sans text-lime-500 mt-5">START RETRO</h1>
              <div className="border border-dashed  border-gray shadow-2xl shadow-gray-900 mix-blend-screen">
                <Image
                  src={ListRetro}
                  width={1800}
                  height={600}
                  alt="Retro Img"
                  placeholder="blur"
                  priority
                >
                </Image>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" p-10 border border-t-0 border-dashed">
        <h1 className="text-2xl text-center font-thin">Why Retro Notes ?</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Real-Time Collaboration</AccordionTrigger>
            <AccordionContent>
              RetroNotes supports real-time collaboration, enabling team members to contribute to retrospectives simultaneously.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>No Login Required to Participate</AccordionTrigger>
            <AccordionContent>
              RetroNotes simplifies the participation process by allowing users to join retrospectives without the need for creating an account or logging in.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Download Retros</AccordionTrigger>
            <AccordionContent>
              RetroNotes allows users to easily download retrospective data in CSV format.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger> Free and Open-Source</AccordionTrigger>
            <AccordionContent>
              RetroNotes is completely free and open-source, making it accessible to everyone.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex mt-10 p-5 border justify-between  border-dashed">
        <div>
          <h1 className="text-md mt-2 md:mt-1 md:text-xl tracking-wide font-light uppercase ">Retro Notes</h1>

        </div>
        <div>
          <Link href="/dashboard">
            <Button variant="link" className=" ">
              <MoveRight className="size-5 mr-2" />  Get Started
            </Button>
          </Link>
          <Link target="_blank" href="https://github.com/retronotes">
            <Button variant="link" className=" ">
              <Github className="size-5 mr-2" />  Contribute On Github
            </Button>
          </Link>
          <Link target="_blank" href="https://www.paypal.com/paypalme/rakeshkumar1531?country.x=IN&locale.x=en_GB">
            <Button variant="link" className=" ">
              <DollarSign className="size-5 mr-2" /> Support Us
            </Button>
          </Link>
        </div>





      </div>
    </div>
  )
}
