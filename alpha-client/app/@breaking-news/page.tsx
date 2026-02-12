import Image from "next/image"

const BreakingNewsSlotPage = () => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-3xl font-medium">Breaking News</h1>
                <p className="text-violet-600 text-sm underline">view all</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full mt-8 items-center">
                <div className="bg-gray-400 w-full md:w-1/2 h-74 rounded-3xl p-2 relative">
                    <Image src="/breaking-news.jpg" alt="Breaking News Image" fill className="rounded-3xl object-cover" />
                    <div className="absolute bottom-4 z-30 left-4 text-black dark:text-white">
                        <p className="text-sm text-white bg-black w-fit px-2 rounded-3xl">Politics</p>
                        <p className="text-lg font-medium mt-1">Lorem Ipusm sdgd sdgds gds g</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-1/2">
                    {[1, 2].map(s => (
                        <div className="h-36 rounded-3xl flex" key={s}>
                            <div className="h-full w-1/3  min-w-36 max-w-40 rounded-3xl bg-gray-400">
                            </div>
                            <div className="p-4">
                                <p className="text-violet-600 text-sm">Crime</p>
                                <p className="text-lg flex-1 h-16">Lorem Ipusm sdgd sdgds gds g</p>
                                <p className="text-sm font-light">24 January 2026</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BreakingNewsSlotPage
