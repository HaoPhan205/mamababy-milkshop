using Microsoft.EntityFrameworkCore;
using MilkRepository.Models;
using MilkRepository.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MilkRepository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private MilkContext _context;
        private GenericRepository<Admin> _admin;
        private GenericRepository<AgeRange> _ageRange;
        private GenericRepository<BrandMilk> _brandMilk;
        private GenericRepository<Company> _company;
        private GenericRepository<Country> _country;
        private GenericRepository<Customer> _customer;
        private GenericRepository<DeliveryMan> _deliveryMan;

        private GenericRepository<Order> _order;
        private GenericRepository<OrderDetail> _orderDetail;
        private GenericRepository<Payment> _payment;
        private GenericRepository<Product> _product;
        private GenericRepository<ProductItem> _productItem;
        private GenericRepository<Storage> _storage;


        public UnitOfWork(MilkContext context)
        {
            _context = context;
        }

       


        public void Save()
        {
            _context.SaveChanges();
        }
        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        GenericRepository<Admin> IUnitOfWork.AdminRepository
        {
            get
            {
                if ( _admin== null)
                {
                    this._admin = new GenericRepository<Admin>(_context);
                }
                return _admin;
            }
        }

        GenericRepository<AgeRange> IUnitOfWork.AgeRangeRepository
        {
            get
            {
                if (_ageRange == null)
                {
                    this._ageRange = new GenericRepository<AgeRange>(_context);
                }
                return _ageRange;
            }
        }

        GenericRepository<BrandMilk> IUnitOfWork.BrandMilkRepository
        {
            get
            {
                if (_brandMilk == null)
                {
                    this._brandMilk = new GenericRepository<BrandMilk>(_context);
                }
                return _brandMilk;
            }
        }
        GenericRepository<Company> IUnitOfWork.CompanyRepository
        {
            get
            {
                if (_company == null)
                {
                    this._company = new GenericRepository<Company>(_context);
                }
                return _company;
            }
        }
        GenericRepository<Country> IUnitOfWork.CountryRepository
        {
            get
            {
                if (_country == null)
                {
                    this._country = new GenericRepository<Country>(_context);
                }
                return _country;
            }
        }
        GenericRepository<Customer> IUnitOfWork.CustomerRepository
        {
            get
            {
                if (_customer == null)
                {
                    this._customer = new GenericRepository<Customer>(_context);
                }
                return _customer;
            }
        }
        GenericRepository<DeliveryMan> IUnitOfWork.DeliveryManRepository
        {
            get
            {
                if (_deliveryMan == null)
                {
                    this._deliveryMan = new GenericRepository<DeliveryMan>(_context);
                }
                return _deliveryMan;
            }
        }
        GenericRepository<Order> IUnitOfWork.OrderRepository
        {
            get
            {
                if (_order == null)
                {
                    this._order = new GenericRepository<Order>(_context);
                }
                return _order;
            }
        }
        GenericRepository<OrderDetail> IUnitOfWork.OrderDetailRepository
        {
            get
            {
                if (_orderDetail == null)
                {
                    this._orderDetail = new GenericRepository<OrderDetail>(_context);
                }
                return _orderDetail;
            }
        }
        GenericRepository<Payment> IUnitOfWork.PaymentRepository
        {
            get
            {
                if (_payment == null)
                {
                    this._payment = new GenericRepository<Payment>(_context);
                }
                return _payment;
            }
        }
        GenericRepository<Product> IUnitOfWork.ProductRepository
        {
            get
            {
                if (_product == null)
                {
                    this._product = new GenericRepository<Product>(_context);
                }
                return _product;
            }
        }
        GenericRepository<ProductItem> IUnitOfWork.ProductItemRepository
        {
            get
            {
                if (_productItem == null)
                {
                    this._productItem = new GenericRepository<ProductItem>(_context);
                }
                return _productItem;
            }
        }
        GenericRepository<Storage> IUnitOfWork.StorageRepository
        {
            get
            {
                if (_storage == null)
                {
                    this._storage = new GenericRepository<Storage>(_context);
                }
                return _storage;
            }
        }

    }
}
