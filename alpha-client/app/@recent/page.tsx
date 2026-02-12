import React from 'react'

const page = () => {
    return (
        <div className="w-full mt-16">
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-3xl font-medium">Recent News</h1>
                <p className="text-violet-600 text-sm underline">view all</p>
            </div>

            {/*  News card starts here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8 justify-between">
                {[1, 2, 3, 4, 5, 6, 7].map(s => (
                    <div className='w-full min-h-64 rounded-3xl' key={s}>
                        <div className='h-2/3 bg-gray-400 rounded-3xl'></div>
                        <div className="py-1 mt-2">
                            <p className="text-violet-600 text-sm">Crime</p>
                            <p className="text-lg flex-1 w-full">Lorem Ipusm sdgd sdgds gds g</p>
                            <p className="text-xs font-light mt-1">24 January 2026</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
