"use client";

import Image from "next/image";
import React from "react";
import { projectItems } from "@/data";
import { CardBody, CardContainer, CardItem, AnimatedTooltip, Heading } from "@/components/ui";
import Link from "next/link";
import VortexWrapper from "../VortexWrapper";

export function Projects() {
  return (
    <VortexWrapper>
      <section id="projects" className="text-white">
      <Heading text={"A collection of My projects"}/>
      <div className="flex flex-wrap sm:gap-8 justify-around">
        {projectItems.map((item,index)=>{
          return(
            <CardContainer key={index} className="inter-var">
              <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black-100 border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-white"
                >
                  {item.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className=" text-sm max-w-sm mt-2 text-neutral-300"
                >
                  {item.description}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <a href={`${item.deployedLink}`} target="__blank">
                  { item.projectImage.includes(".gif") }
                    <Image
                      
                      src={"/projects/"+item.projectImage}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </a>
                </CardItem>
                <div className="flex justify-between flex-col sm:flex-row gap-2 sm:gap-0 items-center mt-16 sm:mt-20">
                  
                  <CardItem
                    translateZ={20}
                    
                    className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                  >
                    <div className="flex">
                      <AnimatedTooltip items={item.techStacks} />
                    </div>
                  </CardItem>
                  <div className="flex gap-2">
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={`${item.deployedLink}`}
                      target="__blank"
                      className="font-bold"
                    >
                      <Image alt="link_icon" height={40} width={40} src="/icons/world-www.svg" />
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as={Link}
                      href={`${item.githubLink}`}
                      target="__blank"
                      className="font-bold"
                    >
                      <Image alt="github_icon" height={40} width={40} src="/icons/github.svg" />
                    </CardItem>
                  </div>
                </div>
              </CardBody>
            </CardContainer>
          )
        })}
      </div>
    </section>
    </VortexWrapper>
  );
}
