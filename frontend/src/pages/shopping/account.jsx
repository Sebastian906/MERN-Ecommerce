import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import accImg from '../../assets/account.jpg'
import Orders from '@/components/shopping/orders';
import Address from '@/components/shopping/address';

function ShoppingAccount() {
    const [activeTab, setActiveTab] = useState('ordenes');
    return ( 
        <div className="flex flex-col bg-pink-100">
            <div className="relative h-[300px] w-full">
                <img
                    style={{aspectRatio: '1600/300', objectFit: 'cover'}}
                    src={accImg}
                    className='h-full w-full object-cover object-center'
                />
            </div>
            <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
                <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="ordenes" className={`px-4 py-2 rounded-l-lg border ${activeTab === 'ordenes' ? '!bg-pink-100 !text-black' : '!bg-pink-100 !text-black opacity-50'}`}>
                                Ordenes
                            </TabsTrigger>
                            <TabsTrigger value="cuenta" className={`px-4 py-2 rounded-r-lg border ${activeTab === 'cuenta' ? '!bg-pink-100 !text-black' : '!bg-pink-100 !text-black opacity-50'}`}>
                                Cuenta
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="ordenes">
                            <Orders/>
                        </TabsContent>
                        <TabsContent value="cuenta">
                            <Address/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ShoppingAccount;