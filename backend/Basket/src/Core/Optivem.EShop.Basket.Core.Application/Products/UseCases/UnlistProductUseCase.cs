﻿using Optivem.Framework.Core.Application;
using Optivem.Framework.Core.Common;
using Optivem.Framework.Core.Common.Mapping;
using Optivem.Framework.Core.Domain;
using Optivem.EShop.Basket.Core.Application.Products.Requests;
using Optivem.EShop.Basket.Core.Application.Products.Responses;
using Optivem.EShop.Basket.Core.Domain.Products;
using System.Threading.Tasks;

namespace Optivem.EShop.Basket.Core.Application.Products.UseCases
{
    public class UnlistProductUseCase : RequestHandler<UnlistProductRequest, UnlistProductResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductRepository _productRepository;

        public UnlistProductUseCase(IMapper mapper, IUnitOfWork unitOfWork, IProductRepository productRepository)
            : base(mapper)
        {
            _unitOfWork = unitOfWork;
            _productRepository = productRepository;
        }

        public override async Task<UnlistProductResponse> HandleAsync(UnlistProductRequest request)
        {
            var productId = new ProductIdentity(request.Id);

            var product = await _productRepository.FindAsync(productId);

            if (product == null)
            {
                throw new NotFoundRequestException();
            }

            product.Unlist();

            await _productRepository.UpdateAsync(product);
            await _unitOfWork.SaveChangesAsync();
            return Mapper.Map<Product, UnlistProductResponse>(product);
        }
    }
}