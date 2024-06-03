using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MilkRepository.Models;

public partial class MilkContext : DbContext
{
    public MilkContext()
    {
    }

    public MilkContext(DbContextOptions<MilkContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<AgeRange> AgeRanges { get; set; }

    public virtual DbSet<BrandMilk> BrandMilks { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<DeliveryMan> DeliveryMen { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductItem> ProductItems { get; set; }

    public virtual DbSet<Storage> Storages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("server =(local); database = Milk;uid=sa;pwd=12345;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__Admin__719FE4E8E1BDABFA");

            entity.ToTable("Admin");

            entity.Property(e => e.AdminId)
                .ValueGeneratedNever()
                .HasColumnName("AdminID");
            entity.Property(e => e.Password).HasColumnType("text");
            entity.Property(e => e.Username).HasColumnType("text");
        });

        modelBuilder.Entity<AgeRange>(entity =>
        {
            entity.HasKey(e => e.AgeRangeId).HasName("PK__AgeRange__8CC41DB112C695B9");

            entity.ToTable("AgeRange");

            entity.Property(e => e.AgeRangeId)
                .ValueGeneratedNever()
                .HasColumnName("AgeRangeID");
            entity.Property(e => e.Baby).HasColumnType("text");
            entity.Property(e => e.Mama).HasColumnType("text");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");

            entity.HasOne(d => d.Product).WithMany(p => p.AgeRanges)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__AgeRange__Produc__24927208");
        });

        modelBuilder.Entity<BrandMilk>(entity =>
        {
            entity.HasKey(e => e.BrandMilkId).HasName("PK__BrandMil__03987540D029647F");

            entity.ToTable("BrandMilk");

            entity.Property(e => e.BrandMilkId)
                .ValueGeneratedNever()
                .HasColumnName("BrandMilkID");
            entity.Property(e => e.BrandName).HasColumnType("text");
            entity.Property(e => e.CompanyId).HasColumnName("CompanyID");

            entity.HasOne(d => d.Company).WithMany(p => p.BrandMilks)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK__BrandMilk__Compa__15502E78");
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.HasKey(e => e.CompanyId).HasName("PK__Company__2D971C4CC1F657DD");

            entity.ToTable("Company");

            entity.Property(e => e.CompanyId)
                .ValueGeneratedNever()
                .HasColumnName("CompanyID");
            entity.Property(e => e.CompanyName).HasColumnType("text");
            entity.Property(e => e.CountryId).HasColumnName("CountryID");

            entity.HasOne(d => d.Country).WithMany(p => p.Companies)
                .HasForeignKey(d => d.CountryId)
                .HasConstraintName("FK__Company__Country__1273C1CD");
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.CountryId).HasName("PK__Country__10D160BF8A491798");

            entity.ToTable("Country");

            entity.Property(e => e.CountryId)
                .ValueGeneratedNever()
                .HasColumnName("CountryID");
            entity.Property(e => e.CountryName).HasColumnType("text");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__A4AE64B89AFBB366");

            entity.ToTable("Customer");

            entity.Property(e => e.CustomerId)
                .ValueGeneratedNever()
                .HasColumnName("CustomerID");
            entity.Property(e => e.CustomerName).HasColumnType("text");
            entity.Property(e => e.Email).HasColumnType("text");
            entity.Property(e => e.Password).HasColumnType("text");
        });

        modelBuilder.Entity<DeliveryMan>(entity =>
        {
            entity.HasKey(e => e.DeliveryManId).HasName("PK__Delivery__E33EAD9DDAED1D40");

            entity.ToTable("DeliveryMan");

            entity.Property(e => e.DeliveryManId)
                .ValueGeneratedNever()
                .HasColumnName("DeliveryManID");
            entity.Property(e => e.DeliveryName).HasColumnType("text");
            entity.Property(e => e.DeliveryStatus).HasColumnType("text");
            entity.Property(e => e.PhoneNumber).HasColumnType("text");
            entity.Property(e => e.StorageId).HasColumnName("StorageID");

            entity.HasOne(d => d.Storage).WithMany(p => p.DeliveryMen)
                .HasForeignKey(d => d.StorageId)
                .HasConstraintName("FK__DeliveryM__Stora__1DE57479");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Order__C3905BAFFAD80D96");

            entity.ToTable("Order");

            entity.Property(e => e.OrderId)
                .ValueGeneratedNever()
                .HasColumnName("OrderID");
            entity.Property(e => e.AdminId).HasColumnName("AdminID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.DeliveryManId).HasColumnName("DeliveryManID");
            entity.Property(e => e.ShippingAddress).HasColumnType("text");
            entity.Property(e => e.StorageId).HasColumnName("StorageID");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.Admin).WithMany(p => p.Orders)
                .HasForeignKey(d => d.AdminId)
                .HasConstraintName("FK__Order__AdminID__2A4B4B5E");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FK__Order__CustomerI__2B3F6F97");

            entity.HasOne(d => d.DeliveryMan).WithMany(p => p.Orders)
                .HasForeignKey(d => d.DeliveryManId)
                .HasConstraintName("FK__Order__DeliveryM__2C3393D0");

            entity.HasOne(d => d.Storage).WithMany(p => p.Orders)
                .HasForeignKey(d => d.StorageId)
                .HasConstraintName("FK__Order__StorageID__2D27B809");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailId).HasName("PK__OrderDet__D3B9D30CFF84747E");

            entity.ToTable("OrderDetail");

            entity.Property(e => e.OrderDetailId)
                .ValueGeneratedNever()
                .HasColumnName("OrderDetailID");
            entity.Property(e => e.OrderDetailStatus).HasColumnType("text");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ProductItemId).HasColumnName("ProductItemID");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__OrderDeta__Order__32E0915F");

            entity.HasOne(d => d.ProductItem).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.ProductItemId)
                .HasConstraintName("FK__OrderDeta__Produ__33D4B598");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payment__9B556A58BCD7332A");

            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId)
                .ValueGeneratedNever()
                .HasColumnName("PaymentID");
            entity.Property(e => e.Amount).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.PaymentMethod).HasColumnType("text");

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK__Payment__OrderID__300424B4");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Product__B40CC6ED7E323E65");

            entity.ToTable("Product");

            entity.Property(e => e.ProductId)
                .ValueGeneratedNever()
                .HasColumnName("ProductID");
            entity.Property(e => e.AdminId).HasColumnName("AdminID");
            entity.Property(e => e.BrandMilkId).HasColumnName("BrandMilkID");
            entity.Property(e => e.ProductName).HasColumnType("text");

            entity.HasOne(d => d.Admin).WithMany(p => p.Products)
                .HasForeignKey(d => d.AdminId)
                .HasConstraintName("FK__Product__AdminID__21B6055D");

            entity.HasOne(d => d.BrandMilk).WithMany(p => p.Products)
                .HasForeignKey(d => d.BrandMilkId)
                .HasConstraintName("FK__Product__BrandMi__20C1E124");
        });

        modelBuilder.Entity<ProductItem>(entity =>
        {
            entity.HasKey(e => e.ProductItemId).HasName("PK__ProductI__1373AD20EFE0298E");

            entity.ToTable("ProductItem");

            entity.Property(e => e.ProductItemId)
                .ValueGeneratedNever()
                .HasColumnName("ProductItemID");
            entity.Property(e => e.Benefit).HasColumnType("text");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Image).HasColumnType("text");
            entity.Property(e => e.ItemName).HasColumnType("text");
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductItems)
                .HasForeignKey(d => d.ProductId)
                .HasConstraintName("FK__ProductIt__Produ__276EDEB3");
        });

        modelBuilder.Entity<Storage>(entity =>
        {
            entity.HasKey(e => e.StorageId).HasName("PK__Storage__8A247E370DB90C65");

            entity.ToTable("Storage");

            entity.Property(e => e.StorageId)
                .ValueGeneratedNever()
                .HasColumnName("StorageID");
            entity.Property(e => e.StorageName).HasColumnType("text");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
