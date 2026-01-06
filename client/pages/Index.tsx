import { Star, ChevronDown, Sparkles, Diamond, MessageCircle, Home, Send, Wallet } from "lucide-react";
import { Avatar } from "@frete.com/fuel-react/avatar";
import { Card } from "@frete.com/fuel-react/card";
import { Chip } from "@frete.com/fuel-react/chip";
import { Search } from "@frete.com/fuel-react/search";
import { Badge } from "@frete.com/fuel-react/badge";
import { useState } from "react";

export default function Index() {
  const [searchValue, setSearchValue] = useState("");

  const freights = [
    {
      id: 1,
      price: "R$ 5.500",
      paymentType: "Pedágio a parte",
      priceBy: "Preço por kg",
      loadType: "Carga completa",
      weight: "250kg",
      distance: "1.639km",
      cargo: "Derivado de soja",
      origin: "Uberlândia, MG",
      destination: "Rondonópolis, MT",
      publisher: "Rodo Cargas",
      isNew: true,
      isVip: true,
      advancement: "100%",
      negotiations: 0
    },
    {
      id: 2,
      price: "R$ 5.500",
      paymentType: "Pedágio a parte",
      priceBy: "Preço por kg",
      loadType: "Carga completa",
      weight: "250kg",
      distance: "1.639km",
      cargo: "Derivado de soja",
      origin: "Uberlândia, MG",
      destination: "Sinop, SP",
      publisher: "Rodo Cargas",
      isNew: true,
      isVip: true,
      advancement: null,
      negotiations: 0
    },
    {
      id: 3,
      price: "R$ 5.500",
      paymentType: "Pedágio incluso",
      priceBy: "Preço por ton",
      loadType: "Complemento",
      weight: "34 ton",
      distance: "534km",
      cargo: "Fertilizantes",
      origin: "São José do Vale do Rio Preto, RJ",
      destination: "Várzea Grande, MG",
      publisher: "Rodo Cargas",
      isNew: false,
      isVip: true,
      advancement: "100%",
      negotiations: 3
    },
    {
      id: 4,
      price: "R$ 5.500",
      paymentType: "Pedágio incluso",
      priceBy: "Preço por ton",
      loadType: "Complemento",
      weight: "34 ton",
      distance: "534km",
      cargo: "Fertilizantes",
      origin: "São José do Vale do Rio Preto, RJ",
      destination: "Barra do Garças, PR",
      publisher: "Rodo Cargas",
      isNew: false,
      isVip: true,
      advancement: null,
      negotiations: 3
    },
    {
      id: 5,
      price: "A combinar",
      paymentType: "Pedágio incluso",
      priceBy: "Preço por ton",
      loadType: "Complemento",
      weight: "34 ton",
      distance: "534km",
      cargo: "Fertilizantes",
      origin: "São José do Vale do Rio Preto, RJ",
      destination: "Tangará da Serra, RJ",
      publisher: "Rodo Cargas",
      isNew: true,
      isVip: false,
      advancement: "100%",
      negotiations: 0
    },
    {
      id: 6,
      price: "A combinar",
      paymentType: "Pedágio incluso",
      priceBy: "Preço por ton",
      loadType: "Complemento",
      weight: "34 ton",
      distance: "534km",
      cargo: "Fertilizantes",
      origin: "São José do Vale do Rio Preto, RJ",
      destination: "Lucas do Rio Verde, SC",
      publisher: "Rodo Cargas",
      isNew: true,
      isVip: false,
      advancement: null,
      negotiations: 0
    },
    {
      id: 7,
      price: "A combinar",
      paymentType: "Pedágio incluso",
      priceBy: "Preço por ton",
      loadType: "Complemento",
      weight: "34 ton",
      distance: "534km",
      cargo: "Fertilizantes",
      origin: "São José do Vale do Rio Preto, RJ",
      destination: "Primavera do Leste, ES",
      publisher: "Rodo Cargas",
      isNew: false,
      isVip: false,
      advancement: "100%",
      negotiations: 3
    },
    {
      id: 8,
      price: "A combinar",
      paymentType: "Pedágio incluso",
      priceBy: "Preço por ton",
      loadType: "Complemento",
      weight: "34 ton",
      distance: "534km",
      cargo: "Fertilizantes",
      origin: "São José do Vale do Rio Preto, RJ",
      destination: "Sorriso, RS",
      publisher: "Rodo Cargas",
      isNew: false,
      isVip: false,
      advancement: null,
      negotiations: 3
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F5] font-satoshi">
      {/* Mobile container */}
      <div className="mx-auto max-w-[360px] bg-[#F4F4F5] min-h-screen relative">
        {/* Android Status Bar */}
        <div className="h-6 bg-white flex items-center justify-between px-3">
          <span className="text-sm font-medium text-[#111] font-roboto">12:30</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular Icon */}
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path d="M2.11719 7.5C2.70196 7.5 3.17676 8.00368 3.17676 8.625V10.875C3.17676 11.4963 2.70196 12 2.11719 12H1.05859C0.473928 11.9999 1.45508e-06 11.4962 0 10.875V8.625C0 8.00376 0.473927 7.50013 1.05859 7.5H2.11719ZM7.05859 5.25C7.64337 5.25 8.11719 5.75368 8.11719 6.375V10.875C8.11719 11.4963 7.64337 12 7.05859 12H6C5.41524 12 4.94141 11.4963 4.94141 10.875V6.375C4.94141 5.75369 5.41524 5.25001 6 5.25H7.05859ZM12 2.625C12.5848 2.62501 13.0586 3.12869 13.0586 3.75V10.875C13.0586 11.4963 12.5848 12 12 12H10.9414C10.3566 12 9.88281 11.4963 9.88281 10.875V3.75C9.88281 3.12868 10.3566 2.625 10.9414 2.625H12ZM16.9414 0C17.5261 0.000132092 18 0.503761 18 1.125V10.875C18 11.4962 17.5261 11.9999 16.9414 12H15.8828C15.298 12 14.8232 11.4963 14.8232 10.875V1.125C14.8232 0.50368 15.298 0 15.8828 0H16.9414Z" fill="#111111"/>
            </svg>
            {/* WiFi Icon */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M5.68555 9.19238C7.02183 8.01196 8.97916 8.01192 10.3154 9.19238C10.3826 9.25585 10.4219 9.34583 10.4238 9.44043C10.4257 9.5351 10.3899 9.62704 10.3252 9.69336L8.23242 11.8984C8.17108 11.9633 8.08726 12 8 12C7.91292 11.9999 7.82979 11.9631 7.76855 11.8984L5.67578 9.69336C5.61113 9.62699 5.57523 9.5351 5.57715 9.44043C5.57909 9.3458 5.61829 9.25582 5.68555 9.19238ZM2.89355 6.25C5.77269 3.45271 10.2313 3.45254 13.1104 6.25C13.1753 6.31555 13.2119 6.40569 13.2129 6.5C13.2138 6.59424 13.1787 6.68502 13.1152 6.75195L11.9053 8.0293C11.7806 8.15955 11.579 8.16204 11.4512 8.03516C10.5057 7.14097 9.27541 6.64543 8 6.64551C6.7255 6.64617 5.49649 7.14155 4.55176 8.03516C4.42388 8.16207 4.22231 8.15967 4.09766 8.0293L2.88867 6.75195C2.82496 6.6851 2.78919 6.59433 2.79004 6.5C2.79096 6.40566 2.82858 6.31554 2.89355 6.25ZM0.100586 3.31543C4.5165 -1.10519 11.4835 -1.10519 15.8994 3.31543C15.9633 3.3811 15.9995 3.47081 16 3.56445C16.0005 3.65801 15.9654 3.74804 15.9023 3.81445L14.6914 5.09082C14.5666 5.22181 14.364 5.22366 14.2373 5.09473C12.5548 3.4239 10.3215 2.49229 8 2.49219C5.67846 2.4923 3.44526 3.42389 1.7627 5.09473C1.63607 5.22376 1.43422 5.22197 1.30957 5.09082L0.0976562 3.81445C0.0345837 3.748 -0.000547202 3.65803 0 3.56445C0.000589494 3.47086 0.0366912 3.38104 0.100586 3.31543Z" fill="#111111"/>
            </svg>
            {/* Battery Icon */}
            <div className="relative w-6 h-3">
              <div className="absolute inset-0 border border-[rgba(17,17,17,0.35)] rounded-[2.667px] opacity-40"></div>
              <div className="absolute left-[2px] top-[2px] w-[18px] h-2 bg-[#111] rounded-[1.333px]"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-3 pb-24">
          {/* Search Bar + Avatar */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1">
              <Search
                placeholder="Busque fretes agora"
                value={searchValue}
                onChange={setSearchValue}
                aria-label="Buscar fretes"
                className="w-full"
              />
            </div>

            {/* Avatar with badge */}
            <div className="relative flex flex-col items-center -mt-2">
              <Avatar
                initial="A"
                size="medium"
                status="online"
                className="w-10 h-10"
              />
              <div className="flex items-center gap-1 h-[23px] px-2 rounded-[500px] bg-white shadow-sm mt-1">
                <Star className="w-3 h-3 fill-[#F5963D] text-[#F5963D]" />
                <span className="text-xs font-bold text-[#636B7E]">4.8</span>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex items-start gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
            <Chip
              label="Tipo de carga"
              dropdown
              iconRight={<ChevronDown className="w-4 h-4" />}
              size="small"
            />
            <Chip
              label="Veículo"
              dropdown
              iconRight={<ChevronDown className="w-4 h-4" />}
              size="small"
            />
            <Chip
              label="Carroceria"
              dropdown
              iconRight={<ChevronDown className="w-4 h-4" />}
              size="small"
            />
            <Chip
              label="Raio"
              size="small"
            />
          </div>

          {/* Freight Cards */}
          <div className="space-y-6">
            {freights.map((freight) => (
              <Card key={freight.id} padding="md" className="relative">
                {/* Card Content */}
                <div className="space-y-4">
                  {/* Price and Details */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#111] leading-[150%]">
                      {freight.price}
                    </h3>
                    <div className="flex items-start gap-2 flex-wrap text-xs font-medium text-[#636B7E] leading-[160%]">
                      <span>{freight.paymentType}</span>
                      <span>•</span>
                      <span>{freight.priceBy}</span>
                      <span>•</span>
                      <span>{freight.loadType}</span>
                    </div>
                    <div className="flex items-start gap-2 flex-wrap text-xs font-medium text-[#636B7E] leading-[160%]">
                      <span>{freight.weight}</span>
                      <span>•</span>
                      <span>{freight.distance}</span>
                      <span>•</span>
                      <span>{freight.cargo}</span>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center gap-2">
                    <svg width="7" height="46" viewBox="0 0 7 46" fill="none" className="flex-shrink-0">
                      <circle cx="3.5" cy="8.5" r="3" stroke="#DFE1E6"/>
                      <rect x="3" y="16" width="1" height="14" fill="#DFE1E6"/>
                      <path d="M6.19141 34.5L3.5 39.8818L0.808594 34.5H6.19141Z" stroke="#DFE1E6"/>
                    </svg>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-[#111] leading-[150%]">{freight.origin}</p>
                      <p className="text-sm font-medium text-[#111] leading-[150%]">{freight.destination}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="py-2">
                    <div className="h-px bg-[#DFE1E6]"></div>
                  </div>

                  {/* Publisher */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#DFE1E6] flex items-center justify-center relative">
                      <svg width="6" height="6" viewBox="0 0 10 10" fill="none" className="absolute -bottom-0.5 -right-0.5">
                        <path d="M5 1C7.20914 1 9 2.79086 9 5C9 7.20914 7.20914 9 5 9C2.79086 9 1 7.20914 1 5C1 2.79086 2.79086 1 5 1Z" fill="#0AB15F" stroke="white" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-[#636B7E]">Publicado por</span>
                      <span className="text-xs font-bold text-[#636B7E]">{freight.publisher}</span>
                    </div>
                  </div>
                </div>

                {/* Tags - Top Right */}
                <div className="absolute top-0 right-0 flex items-center h-7 rounded-bl-lg overflow-hidden">
                  {freight.isNew && (
                    <div className="h-full px-2 bg-[#0769DA] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white fill-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-[0.4px]">NOVO</span>
                    </div>
                  )}
                  {freight.advancement && (
                    <div className="h-full px-2 bg-[#DAEDE0] flex items-center">
                      <span className="text-[10px] font-bold text-[#0C884C] uppercase tracking-[0.4px]">{freight.advancement}</span>
                    </div>
                  )}
                  {freight.isVip && (
                    <div className="h-full px-2 bg-[#0769DA] flex items-center gap-1">
                      <Diamond className="w-3 h-3 text-white fill-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-[0.4px]">VIP</span>
                    </div>
                  )}
                  {freight.negotiations > 0 && (
                    <div className="h-full px-2 bg-[#DFE1E6] flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-[#636B7E] fill-[#636B7E]" />
                      <span className="text-[10px] font-bold text-[#636B7E] uppercase tracking-[0.4px]">{freight.negotiations}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation - Fixed */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(0,43,92,0.06)] max-w-[360px] mx-auto">
          <div className="flex items-center justify-around h-[88px] px-2">
            <button className="flex flex-col items-center justify-center gap-1 flex-1 rounded-[100px] py-2">
              <Home className="w-6 h-6 fill-[#0769DA] text-[#0769DA]" />
              <span className="text-xs font-bold text-[#111]">Início</span>
            </button>
            <button className="relative flex flex-col items-center justify-center gap-1 flex-1 rounded-[100px] py-2">
              <MessageCircle className="w-6 h-6 text-[#636B7E]" />
              <span className="text-xs font-medium text-[#636B7E]">Chat</span>
              <div className="absolute top-1 right-6 w-4 h-4 rounded-full bg-[#E04747] border border-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-white leading-none">2</span>
              </div>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 flex-1 rounded-[100px] py-2">
              <Send className="w-6 h-6 text-[#636B7E]" />
              <span className="text-xs font-medium text-[#636B7E]">Viagens</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 flex-1 rounded-[100px] py-2">
              <Wallet className="w-6 h-6 text-[#636B7E]" />
              <span className="text-xs font-medium text-[#636B7E]">Carteira</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
